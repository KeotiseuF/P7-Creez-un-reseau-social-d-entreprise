import { ErrorAuth } from "../../components/Error";
import { NavHome } from "../../components/Nav";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ModifyPost() {
    const token = JSON.parse(localStorage.getItem("token"));
    let { id } = useParams();

    const [postMessage, setPostMessage] = useState(" ");
    const [image, setImage] = useState(" ");
    const [altImage, setAltImage] = useState(" ");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({ mode: "onTouched" });

    useEffect(() => {
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
                setPostMessage(data.postMessage);
                setImage(data.imageUrl);
                setAltImage(data.imageUrl.split("/images/")[1]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id, token]);

    const onSubmit = (data) => {
        console.log(data);
        const post = new FormData();
        post.append("post", JSON.stringify({ postMessage: data.postMessage }));
        post.append("image", data.imageUrl[0]);

        fetch(`http://localhost:4200/api/posts/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: post,
        })
            .then((response) => {
                response.json();
            })
            .then(() => {
                alert("Post modifié !");
                document.location.href = "http://localhost:3000/accueil";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return token ? (
        <>
            <header>
                <NavHome />
                <h1>Une modification à faire ?</h1>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="frame_commentaire">
                    <label htmlFor="postMessage">Commentaire :</label>
                    <input
                        name="postMessage"
                        id="postMessage"
                        type="text"
                        value={postMessage}
                        {...register("postMessage", { required: true })}
                        onChange={(e) => setPostMessage(e.target.value)}
                    />
                </div>

                <img src={image} alt={altImage}></img>
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
                    <input value="Valider" id="valid_form" type="submit" />
                </div>
            </form>
        </>
    ) : (
        <ErrorAuth />
    );
}

export default ModifyPost;
