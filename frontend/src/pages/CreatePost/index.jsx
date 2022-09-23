import { useForm } from "react-hook-form";
import { NavCreatePost } from "../../components/Nav";

function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    const to = token.replace(/"/g, " ")
    fetch(`http://localhost:4200/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${to}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        data.error !== undefined
          ? data && console.log(data) && alert("Post ajouté !")
          : alert("Veuillez vérifier vos données");
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

  return (
    <div>
      <header>
        <NavCreatePost />
        <h1>Exprimez-vous</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="frame_commentaire">
          <label htmlFor="commentaire">Commentaire :</label>
          <input
            id="commentaire"
            type="text"
            {...register("commentaire", { required: true })}
          />
        </div>

        <div className="frame_image">
          <label htmlFor="image">Veuillez insérer une image:</label>
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg,"
            {...register("image")}
          />
        </div>

        <div className="valid_form">
          <input value="Valider" className="valid_form" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;