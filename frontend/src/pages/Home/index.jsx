import { ErrorAuth } from "../../components/Error"; //Importe une fonction qui gère les erreurs d'authentification.
import React from "react"; // Va permettre d'inclure le mode strict autour de mes composants.
import { HeaderHome } from "../../components/Header"; // Importe le composant Header dans ma page.
import { StyledMain } from "../../utils/style/Home"; // Importe le style de ma page d'accueil (partie static).
import "../../utils/style/HomeCss/styleHome.css"; // Importe le style de ma page d'accueil (partie dynamique).

// Affiche la page d'accueil.
function Home() {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("userId"));

    // Fournit un lien dynamique, qui a pour paramètre l'id du post à modifier.
    const urlModify = (id) => {
        let url = `accueil/modify_post/${id}`;
        return url;
    };

    // Récupère les posts sur le backend pour ensuite les afficher sur la page.
    fetch("http://localhost:4200/api/posts", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            for (let i in data.reverse()) {
                const urlImage = data[i].imageUrl.split("/images/")[1];
                const extensionImage = urlImage.split(".")[2];

                // Crée un alt à partir de l'url de l'image.
                const altImage = () => {
                    let alt = "";
                    if (extensionImage === "png") {
                        alt = urlImage.split(".png")[0];
                    } else if (extensionImage === "jpg") {
                        alt = urlImage.split(".jpg")[0];
                    } else {
                        alt = urlImage.split(".jpeg")[0];
                    }
                    return alt;
                };

                // Regarde la taille de l'image et lui définit l'attribut qui lui est adapté.
                const lookSizeImg = () => {
                    if (image.naturalHeight >= image.naturalWidth) {
                        return "cart__img--portrait";
                    } else {
                        return "cart__img";
                    }
                };

                const main = document.getElementsByTagName("main");

                const post = document.createElement("div");
                post.classList.add("post");
                post.setAttribute("data-id", data[i]._id);
                main[0].appendChild(post);

                const itmImage = document.createElement("div");
                itmImage.classList.add("cart__item__img");
                post.appendChild(itmImage);

                const image = document.createElement("img");
                image.setAttribute("src", data[i].imageUrl);
                image.classList.add(lookSizeImg());
                image.setAttribute("alt", altImage());
                itmImage.appendChild(image);

                const container = document.createElement("div");
                container.classList.add("container");
                post.appendChild(container);

                const postMessage = document.createElement("p");
                postMessage.classList.add("post_message");
                postMessage.innerHTML = data[i].postMessage;
                container.appendChild(postMessage);

                const containerCheckbox = document.createElement("div");
                containerCheckbox.classList.add("container_checkbox");
                container.appendChild(containerCheckbox);

                const containerLike = document.createElement("div");
                containerLike.classList.add("container_like");
                containerCheckbox.appendChild(containerLike);

                const like = document.createElement("input");
                like.classList.add("like");
                like.setAttribute("id", `like-${i}`);
                like.setAttribute("type", "checkbox");
                containerLike.appendChild(like);

                const heartLike = document.createElement("label");
                heartLike.classList.add("heart_like");
                heartLike.setAttribute("for", `like-${i}`);
                containerLike.appendChild(heartLike);

                const containerDislike = document.createElement("div");
                containerDislike.classList.add("container_dislike");
                containerCheckbox.appendChild(containerDislike);

                const dislike = document.createElement("input");
                dislike.classList.add("dislike");
                dislike.setAttribute("id", `dislike-${i}`);
                dislike.setAttribute("type", "checkbox");
                containerDislike.appendChild(dislike);

                const heartDislike = document.createElement("label");
                heartDislike.classList.add("heart_dislike");
                heartDislike.setAttribute("for", `dislike-${i}`);
                containerDislike.appendChild(heartDislike);

                const containerNumberLikesDislikes =
                    document.createElement("div");
                containerNumberLikesDislikes.setAttribute(
                    "id",
                    "container_number_likes_dislikes"
                );
                post.appendChild(containerNumberLikesDislikes);

                const numberLikes = document.createElement("p");
                numberLikes.innerHTML = `Nombre de ❤️ = ${data[i].likes}`;
                containerNumberLikesDislikes.appendChild(numberLikes);

                const numberDislikes = document.createElement("p");
                numberDislikes.innerHTML = `Nombre de 💔 = ${data[i].dislikes}`;
                containerNumberLikesDislikes.appendChild(numberDislikes);

                const deleted = document.createElement("button");
                const id = post.dataset.id;

                // Permet d'afficher les buttons "supprimer" et "modifier" si l'utilisateur est bien le propriétaire des posts.
                if (userId === data[i].userId || window.name === "admin") {
                    const containerButtons = document.createElement("div");
                    containerButtons.classList.add("container_buttons");
                    container.appendChild(containerButtons);

                    const modified = document.createElement("a");
                    modified.classList.add("modified");
                    modified.setAttribute("href", urlModify(id));
                    modified.innerHTML = "Modifier";
                    containerButtons.appendChild(modified);

                    deleted.classList.add("deleted");
                    deleted.innerHTML = "Supprimer";
                    containerButtons.appendChild(deleted);
                }

                // Active ou non le bouton "dislike" ou "like" dès l'affichage de la page si l'utilisateur se trouve dans un des tableaux "userLike" ou "userDislike".
                if (data[i].usersDisliked.find((e) => e === userId)) {
                    containerLike.style.display = "none";
                    dislike.setAttribute("checked", "true");
                } else if (data[i].usersLiked.find((e) => e === userId)) {
                    containerDislike.style.display = "none";
                    like.setAttribute("checked", "true");
                }

                // Si "dislike" est sélectionné on envoie au backend le résultat et désactive le bouton "like".
                dislike.addEventListener("click", (e) => {
                    if (dislike.checked) {
                        fetch(`http://localhost:4200/api/posts/${id}/like`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ like: -1 }),
                        })
                            .then((response) => {
                                response.json();
                            })
                            .then(() => {
                                alert("Post dislike !");
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        like.setAttribute("disabled", "true");
                        containerLike.style.display = "none";
                        numberDislikes.innerHTML = `Nombre de 💔 = ${(data[
                            i
                        ].dislikes += 1)}`;
                    } else {
                        fetch(`http://localhost:4200/api/posts/${id}/like`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ like: 1 }),
                        })
                            .then((response) => {
                                response.json();
                            })
                            .then((data) => {
                                alert("Dislike enlevé !");
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        like.removeAttribute("disabled");
                        containerLike.style.display = "block";
                        numberDislikes.innerHTML = `Nombre de 💔 = ${(data[
                            i
                        ].dislikes -= 1)}`;
                    }
                });

                // Si like est sélectionné on envoie au backend le résultat et désactive le bouton "like".
                like.addEventListener("click", () => {
                    const id = post.dataset.id;

                    if (like.checked) {
                        fetch(`http://localhost:4200/api/posts/${id}/like`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ like: 1 }),
                        })
                            .then((response) => {
                                response.json();
                            })
                            .then(() => {
                                alert("Post like !");
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        dislike.setAttribute("disabled", "true");
                        containerDislike.style.display = "none";
                        numberLikes.innerHTML = `Nombre de ❤️ = ${(data[
                            i
                        ].likes += 1)}`;
                    } else {
                        fetch(`http://localhost:4200/api/posts/${id}/like`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ like: -1 }),
                        })
                            .then((response) => {
                                response.json();
                            })
                            .then((data) => {
                                alert("Like enlevé !");
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        dislike.removeAttribute("disabled");
                        containerDislike.style.display = "block";
                        numberLikes.innerHTML = `Nombre de ❤️ = ${(data[
                            i
                        ].likes -= 1)}`;
                    }
                });

                // Lors du clique sur le boutton "supprimer" supprime du backend le post et enlève l'élément du DOM.
                deleted.addEventListener("click", (e) => {
                    const id = post.dataset.id;

                    fetch(`http://localhost:4200/api/posts/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: "",
                    })
                        .then((response) => {
                            response.json();
                        })
                        .then(() => {
                            alert("Post supprimé !");
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                    main[0].removeChild(post);
                });
            }
        })
        .catch(function (err) {
            console.error("Une erreur est survenue");
        });

    return token ? (
        <React.StrictMode>
            <HeaderHome />
            <StyledMain>{/*Les posts ce situent ici.*/}</StyledMain>
        </React.StrictMode>
    ) : (
        <ErrorAuth />
    );
}

export default Home;
