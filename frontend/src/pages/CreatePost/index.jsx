import { useForm } from "react-hook-form";
import { NavCreatePost } from "../../components/Nav";
import { ErrorAuth } from "../../components/Error";

function CreatePost() {
  const token = JSON.parse(localStorage.getItem("token"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onTouched" });

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
        alert("Post ajouté !");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /*function fileValidation() {
    var fileInput = document.getElementById("image");
    var filePath = fileInput.value;
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    } else {
      // Image preview
      if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("imagePreview").innerHTML =
            '<img src="' + e.target.result + '"/>';
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  }*/

  return token ? (
    <>
      <header>
        <NavCreatePost />
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
          />
        </div>

        <div className="valid_form">
          <input value="Valider" className="valid_form" type="submit" />
        </div>
      </form>
    </>
  ) : (
    <ErrorAuth />
  );
}

export default CreatePost;
