use eframe::egui;

use crate::api::{ApiClient, ApiError};
use crate::types::{AdminOverview, AuthUser};

#[derive(Default, PartialEq, Eq)]
enum AdminTab {
    #[default]
    Overview,
    Users,
}

#[derive(Default)]
pub struct AdminApp {
    api: ApiClient,
    email: String,
    password: String,
    user: Option<AuthUser>,
    overview: Option<AdminOverview>,
    users: Vec<AuthUser>,
    tab: AdminTab,
    error: Option<String>,
}

impl AdminApp {
    fn sign_in(&mut self) {
        self.error = None;
        match self.api.login(self.email.trim(), &self.password) {
            Ok(user) => {
                self.user = Some(user);
                self.password.clear();
                self.load_admin_data();
            }
            Err(error) => self.set_error(error),
        }
    }

    fn sign_out(&mut self) {
        if let Err(error) = self.api.logout() {
            self.error = Some(error.to_string());
        }
        self.reset_session();
    }

    fn reset_session(&mut self) {
        self.user = None;
        self.overview = None;
        self.users.clear();
        self.tab = AdminTab::Overview;
        self.password.clear();
    }

    fn load_admin_data(&mut self) {
        match self.api.overview() {
            Ok(overview) => self.overview = Some(overview),
            Err(error) => {
                self.set_error(error);
                return;
            }
        }

        match self.api.users() {
            Ok(users) => self.users = users,
            Err(error) => self.set_error(error),
        }
    }

    fn set_error(&mut self, error: ApiError) {
        if error.status == Some(401) {
            self.reset_session();
            self.error = Some("Session expired. Sign in again.".to_owned());
        } else {
            self.error = Some(error.to_string());
        }
    }

    fn login_ui(&mut self, ui: &mut egui::Ui) {
        ui.vertical_centered(|ui| {
            ui.add_space(48.0);
            ui.heading("Orbit Admin");
            ui.label("Sign in with an account created by the Go auth service");
        });

        ui.add_space(24.0);

        egui::Grid::new("login_form")
            .num_columns(2)
            .spacing([12.0, 12.0])
            .show(ui, |ui| {
                ui.label("Email");
                ui.text_edit_singleline(&mut self.email);
                ui.end_row();

                ui.label("Password");
                ui.add(egui::TextEdit::singleline(&mut self.password).password(true));
                ui.end_row();
            });

        ui.add_space(16.0);

        if let Some(error) = &self.error {
            ui.colored_label(egui::Color32::RED, error.as_str());
            ui.add_space(8.0);
        }

        let can_submit = !self.email.trim().is_empty() && !self.password.is_empty();
        if ui
            .add_enabled(can_submit, egui::Button::new("Sign in"))
            .clicked()
        {
            self.sign_in();
        }

        ui.add_space(12.0);
        ui.label(format!("Backend: {}", self.api.base_url()));
    }

    fn admin_ui(&mut self, ui: &mut egui::Ui) {
        let identity = self
            .user
            .as_ref()
            .map(|user| format!("{} ({})", user.email, user.role))
            .unwrap_or_default();
        let mut sign_out_clicked = false;

        ui.horizontal(|ui| {
            ui.heading("Orbit Admin");
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                sign_out_clicked = ui.button("Sign out").clicked();
                ui.label(identity);
            });
        });

        if sign_out_clicked {
            self.sign_out();
            return;
        }

        ui.separator();

        ui.horizontal(|ui| {
            if ui
                .selectable_label(self.tab == AdminTab::Overview, "Overview")
                .clicked()
            {
                self.tab = AdminTab::Overview;
            }
            if ui
                .selectable_label(self.tab == AdminTab::Users, "Users")
                .clicked()
            {
                self.tab = AdminTab::Users;
            }
        });

        if let Some(error) = &self.error {
            ui.colored_label(egui::Color32::RED, error.as_str());
        }

        ui.separator();

        egui::ScrollArea::vertical().show(ui, |ui| match self.tab {
            AdminTab::Overview => self.overview_ui(ui),
            AdminTab::Users => self.users_ui(ui),
        });
    }

    fn overview_ui(&self, ui: &mut egui::Ui) {
        let Some(overview) = &self.overview else {
            ui.label("No overview data loaded.");
            return;
        };

        ui.heading("Overview");
        ui.add_space(12.0);

        egui::Grid::new("overview_grid")
            .num_columns(2)
            .spacing([24.0, 12.0])
            .show(ui, |ui| {
                ui.strong("Accounts");
                ui.label(overview.users.to_string());
                ui.end_row();

                ui.strong("Administrators");
                ui.label(overview.admins.to_string());
                ui.end_row();

                ui.strong("Auth service");
                ui.label(overview.service.as_str());
                ui.end_row();
            });
    }

    fn users_ui(&self, ui: &mut egui::Ui) {
        ui.heading("Users");
        ui.add_space(12.0);

        if self.users.is_empty() {
            ui.label("No accounts found.");
            return;
        }

        egui::Grid::new("users_grid")
            .num_columns(4)
            .spacing([16.0, 8.0])
            .show(ui, |ui| {
                ui.strong("Email");
                ui.strong("Role");
                ui.strong("Created");
                ui.strong("User ID");
                ui.end_row();

                for user in &self.users {
                    let created = user
                        .created_at
                        .split('T')
                        .next()
                        .unwrap_or(&user.created_at);
                    let id_preview = user.id.chars().take(8).collect::<String>();

                    ui.label(user.email.as_str());
                    ui.label(user.role.as_str());
                    ui.label(created);
                    ui.label(format!("{id_preview}…"));
                    ui.end_row();
                }
            });
    }
}

impl eframe::App for AdminApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            if self.user.is_some() {
                self.admin_ui(ui);
            } else {
                self.login_ui(ui);
            }
        });
    }
}
