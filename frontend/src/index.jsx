import React from "react"; // API qui permet de gérer les composants
import ReactDOM from "react-dom/client"; // API qui est responsable de générer les composants dans le DOM.
import GlobalStyle from "./utils/style/GlobalStyle"; // Importe le style global de mon site.
import Home from "./pages/Home"; // Importe la page d'accueil.
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Packages qui permettent de gérer les routes de mon site avec mes différents composants.
import Connect from "./pages/Connect"; // Importe la page de connexion.
import CreatePost from "./pages/CreatePost"; // Importe la page de création de post.
import { Error } from "./components/Error"; // Importe l'erreur à afficher lorsqu'une route n'existe pas.
import ModifyPost from "./pages/ModifyPost"; // Importe la page modifié le post.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <GlobalStyle />
        <Routes>
            <Route path="/" element={<Connect />} />
            <Route path={`/accueil`} element={<Home />} />
            <Route path="/accueil/create_post" element={<CreatePost />} />
            <Route path="/accueil/modify_post/:id" element={<ModifyPost />} />
            <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>
);
