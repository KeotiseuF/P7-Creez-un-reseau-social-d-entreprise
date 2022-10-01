import { useForm } from "react-hook-form"; // Hook qui permet de gérer un formulaire.
import { NavHome } from "../../components/Nav"; // Importe une fonction qui gère des liens de navigation.
import { ErrorAuth } from "../../components/Error"; //Importe une fonction qui gère les erreurs d'authentification.
import React from "react"; // Va permettre d'inclure le mode strict autour de mes composants.

// Affiche la page pour créer un post .
function CreatePost() {
    const token = JSON.parse(localStorage.getItem("token"));

    const {
        register, //  Permet d'enregistrer une entrée.
        handleSubmit, // Reçoit les données du formulaire si la validation du formulaire est réussie.
    } = useForm({ mode: "onTouched" }); // La validation se déclenchera à événement.

    // Envoie les données du formulaire au backend.
    const onSubmit = (data) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const post = new FormData();

        post.append("post", JSON.stringify({ postMessage: data.postMessage }));
        post.append("image", data.imageUrl[0]);

        fetch("http://localhost:4200/api/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: post,
        })
            .then((response) => {
                response.json();
            })
            .then(() => {
                window.location.href = `/accueil`;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const fileTypes = ["jpg", "jpeg", "png"];

    // Vérifie l'extension des fichiers, une alert intervient s'il ne s'agit pas d'image.
    function validFileType() {
        const image = document.getElementById("image").value.split(".")[1];
        const validForm = document.getElementsByClassName("valid_form");
        const validation = fileTypes.find((e) => e === image);

        if (validation === undefined) {
            alert("Type de fichier invalide");
        } else {
            validForm[1].removeAttribute("disabled");
        }
    }

    return token ? (
        <React.StrictMode>
            <header>
                <NavHome />
                <h1>Exprimez-vous</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="frame_commentaire">
                    <label htmlFor="postMessage">Commentaire :</label>
                    <input
                        name="postMessage"
                        id="postMessage"
                        type="text"
                        {...register("postMessage", { required: true })}
                    />
                </div>

                <div className="frame_image">
                    <label htmlFor="image">Veuillez insérer une image:</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg,"
                        {...register("imageUrl")}
                        onChange={() => validFileType()}
                    />
                </div>

                <div className="valid_form">
                    <input
                        disabled
                        value="Valider"
                        className="valid_form"
                        type="submit"
                    />
                </div>
            </form>
        </React.StrictMode>
    ) : (
        <ErrorAuth />
    );
}

export default CreatePost;
