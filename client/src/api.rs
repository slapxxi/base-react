use std::fmt;

use reqwest::blocking::Response;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};

use crate::types::{AdminOverview, AuthUser};

const DEFAULT_BASE_URL: &str = "http://127.0.0.1:8080";

#[derive(Debug)]
pub struct ApiError {
    pub status: Option<u16>,
    pub message: String,
}

impl fmt::Display for ApiError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.message)
    }
}

impl std::error::Error for ApiError {}

impl From<reqwest::Error> for ApiError {
    fn from(error: reqwest::Error) -> Self {
        Self {
            status: error.status().map(|status| status.as_u16()),
            message: error.to_string(),
        }
    }
}

#[derive(Deserialize)]
struct ErrorBody {
    error: Option<String>,
}

#[derive(Serialize)]
struct LoginRequest<'a> {
    email: &'a str,
    password: &'a str,
}

#[derive(Deserialize)]
struct LoginResponse {
    user: AuthUser,
}

#[derive(Deserialize)]
struct OkResponse {
    ok: bool,
}

#[derive(Deserialize)]
struct UsersResponse {
    users: Vec<AuthUser>,
}

pub struct ApiClient {
    base_url: String,
    http: reqwest::blocking::Client,
}

impl Default for ApiClient {
    fn default() -> Self {
        Self::new(DEFAULT_BASE_URL)
    }
}

impl ApiClient {
    pub fn new(base_url: impl Into<String>) -> Self {
        let http = reqwest::blocking::Client::builder()
            .cookie_store(true)
            .build()
            .expect("build HTTP client");

        Self {
            base_url: base_url.into(),
            http,
        }
    }

    pub fn base_url(&self) -> &str {
        &self.base_url
    }

    pub fn login(&self, email: &str, password: &str) -> Result<AuthUser, ApiError> {
        let response = self
            .http
            .post(self.url("/api/auth/login"))
            .json(&LoginRequest { email, password })
            .send()?;

        let result: LoginResponse = Self::parse(response)?;
        Ok(result.user)
    }

    pub fn logout(&self) -> Result<(), ApiError> {
        let response = self.http.post(self.url("/api/auth/logout")).send()?;
        let result: OkResponse = Self::parse(response)?;
        let _ = result.ok;
        Ok(())
    }

    pub fn overview(&self) -> Result<AdminOverview, ApiError> {
        let response = self.http.get(self.url("/api/admin/overview")).send()?;
        Self::parse(response)
    }

    pub fn users(&self) -> Result<Vec<AuthUser>, ApiError> {
        let response = self.http.get(self.url("/api/admin/users")).send()?;
        let result: UsersResponse = Self::parse(response)?;
        Ok(result.users)
    }

    fn url(&self, path: &str) -> String {
        format!("{}{}", self.base_url.trim_end_matches('/'), path)
    }

    fn parse<T: DeserializeOwned>(response: Response) -> Result<T, ApiError> {
        let status = response.status();
        if !status.is_success() {
            let message = response
                .json::<ErrorBody>()
                .ok()
                .and_then(|body| body.error)
                .unwrap_or_else(|| format!("Request failed with status {}", status.as_u16()));

            return Err(ApiError {
                status: Some(status.as_u16()),
                message,
            });
        }

        response.json::<T>().map_err(ApiError::from)
    }
}
