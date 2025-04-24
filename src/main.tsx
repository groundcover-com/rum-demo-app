import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./routes/app.tsx";
import { Cart } from "./routes/cart.tsx";
import groundcover from "@groundcover/browser";

function init() {
  groundcover.init({
    cluster: "dev",
    environment: "dev",
    appId: "app-id",
    dsn: "https://<public_endpoint>",
    apiKey: "api-key",
  });

  groundcover.identifyUser({
    email: "@test.com",
    name: "Test User",
    organization: "Test Organization",
  });
}

init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
