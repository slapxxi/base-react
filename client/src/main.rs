mod api;
mod app;
mod types;

use app::AdminApp;
use eframe::egui;

fn main() -> eframe::Result<()> {
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default().with_inner_size([960.0, 640.0]),
        ..Default::default()
    };

    eframe::run_native(
        "Orbit Admin",
        options,
        Box::new(|_creation_context| Ok(Box::new(AdminApp::default()))),
    )
}
