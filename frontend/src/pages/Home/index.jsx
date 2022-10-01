import { NavPrincipal } from "../../components/Nav"; // Importe une fonction qui gère des liens de navigation.
import { ErrorAuth } from "../../components/Error"; //Importe une fonction qui gère les erreurs d'authentification.
import React from "react"; // Va permettre d'inclure le mode strict autour de mes composants.

// Affiche la page d'accueil.
function Home() {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("userId"));

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
                image.setAttribute("alt", altImage());
                itmImage.appendChild(image);

                const container = document.createElement("container");
                container.classList.add("container");
                post.appendChild(container);

                const postMessage = document.createElement("p");
                postMessage.classList.add("post_message");
                postMessage.innerHTML = data[i].postMessage;
                container.appendChild(postMessage);

                const like = document.createElement("input");
                like.classList.add("like");
                like.setAttribute("type", "checkbox");
                container.appendChild(like);

                const dislike = document.createElement("input");
                dislike.classList.add("dislike");
                dislike.setAttribute("type", "checkbox");
                container.appendChild(dislike);

                const deleted = document.createElement("button");
                const id = post.dataset.id;

                // Permet d'afficher les buttons "supprimer" et "modifier" si l'utilisateur est bien le propriétaire des posts.
                if (userId === data[i].userId) {
                    const modified = document.createElement("a");
                    modified.classList.add("modified");
                    modified.setAttribute("href", urlModify(id));
                    modified.innerHTML = "Modifier";
                    container.appendChild(modified);

                    deleted.classList.add("deleted");
                    deleted.innerHTML = "Supprimer";
                    container.appendChild(deleted);
                }

                // Active ou non le bouton "dislike" ou "like" dès l'affichage de la page si l'utilisateur se trouve dans un des tableaux "userLike" ou "userDislike".
                if (data[i].usersDisliked.find((e) => e === userId)) {
                    like.setAttribute("disabled", "true");
                    dislike.setAttribute("checked", "true");
                } else if (data[i].usersLiked.find((e) => e === userId)) {
                    dislike.setAttribute("disabled", "true");
                    like.setAttribute("checked", "true");
                }

                // Si "dislike" est sélectionné on envoie au backend le résultat et désactive le bouton "like".
                dislike.addEventListener("click", () => {
                    dislike.checked
                        ? fetch(`http://localhost:4200/api/posts/${id}/like`, {
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
                              }) && like.setAttribute("disabled", "true")
                        : fetch(`http://localhost:4200/api/posts/${id}/like`, {
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
                              }) && like.removeAttribute("disabled");
                });

                // Si like est sélectionné on envoie au backend le résultat et désactive le bouton "like".
                like.addEventListener("click", () => {
                    const id = post.dataset.id;
                    like.checked
                        ? fetch(`http://localhost:4200/api/posts/${id}/like`, {
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
                              }) && dislike.setAttribute("disabled", "true")
                        : fetch(`http://localhost:4200/api/posts/${id}/like`, {
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
                              }) && dislike.removeAttribute("disabled");
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
                    main[0].removeChild(e.path[2]);
                });
            }
        })
        .catch(function (err) {
            console.error("Une erreur est survenue");
        });

    return token ? (
        <React.StrictMode>
            <header>
                <h1>Accueil</h1>
                <NavPrincipal />
            </header>
            <main>{/*Les posts ce situent ici.*/}</main>
        </React.StrictMode>
    ) : (
        <ErrorAuth />
    );
}

export default Home;
