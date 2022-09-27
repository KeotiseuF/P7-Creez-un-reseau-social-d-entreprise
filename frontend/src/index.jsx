import React from "react"; // API qui permet de gérer les composants
import ReactDOM from "react-dom/client"; // API qui est responsable de générer les composants dans le DOM.
import GlobalStyle from "./utils/style/GlobalStyle";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import CreatePost from "./pages/CreatePost";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Connect />} />
      <Route path="/accueil" element={<Home />} />
      <Route path="accueil/create_post" element={<CreatePost />} />
    </Routes>
  </BrowserRouter>
);
