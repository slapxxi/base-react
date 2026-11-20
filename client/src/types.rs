use serde::Deserialize;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthUser {
    pub id: String,
    pub email: String,
    pub role: String,
    pub created_at: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct AdminOverview {
    pub service: String,
    pub users: usize,
    pub admins: usize,
}
