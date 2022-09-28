import { ErrorAuth } from "../../components/Error";
import { NavCreatePost } from "../../components/Nav";

function ModifyPost() {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = window.location.search; // Permet d'afficher les paramètres de l'url.
  const params = new URLSearchParams(url); // Cherche dans les paramètres de l'url le premier paramètre.
  const id = params.get("id"); // Renvoie le premier paramètre qui est pour le cas "l'id".

  fetch(`http://localhost:4200/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return token ? (
    <>
      <header>
        <NavCreatePost />
        <h1>Modify</h1>
      </header>
    </>
  ) : (
    <ErrorAuth />
  );
}

export default ModifyPost;
