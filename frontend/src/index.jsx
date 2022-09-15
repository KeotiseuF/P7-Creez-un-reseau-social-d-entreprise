import React from "react"; // API qui permet de gérer les composants
import ReactDOM from "react-dom/client"; // API qui est responsable de générer les composants dans le DOM.
import GlobalStyle from "./utils/style/GlobalStyle";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Connect from "./pages/Connect";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/connect" element={<Connect />} />
    </Routes>
  </BrowserRouter>
);
