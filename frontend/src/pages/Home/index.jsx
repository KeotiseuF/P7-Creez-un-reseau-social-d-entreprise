import { NavPrincipal } from "../../components/Nav";
import { ErrorAuth } from "../../components/Error";

function Home() {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("userId"));

    const urlModify = (id) => {
        let url = `accueil/modify_post/${id}`;
        return url;
    };

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
                const altImage = data[i].imageUrl.split("/images/")[1];
                //const pop = altImage.split(".png")[0];
                //const pip = altImage.split(".jpg")[0];
                //console.log(pop);
                //console.log(pip);
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
                image.setAttribute("alt", altImage);
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

                const id = post.dataset.id;

                const modified = document.createElement("a");
                modified.classList.add("modified");
                modified.setAttribute("href", urlModify(id));
                modified.innerHTML = "Modifier";
                container.appendChild(modified);

                const deleted = document.createElement("button");
                deleted.classList.add("deleted");
                deleted.innerHTML = "Supprimer";
                container.appendChild(deleted);

                like.addEventListener("click", () => {
                    like.checked
                        ? dislike.setAttribute("disabled", "true")
                        : dislike.removeAttribute("disabled");
                });
                console.log(data);
                if (data[i].usersDisliked.find((e) => e === userId)) {
                    like.setAttribute("disabled", "true");
                    dislike.setAttribute("checked", "true");
                } else if (data[i].usersLiked.find((e) => e === userId)) {
                    dislike.setAttribute("disabled", "true");
                    like.setAttribute("checked", "true");
                }
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
                                  console.log(data);
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
        <>
            <header>
                <h1>Accueil</h1>
                <NavPrincipal />
            </header>
            <main>{/*Les posts ce situent ici.*/}</main>
        </>
    ) : (
        <ErrorAuth />
    );
}

export default Home;
