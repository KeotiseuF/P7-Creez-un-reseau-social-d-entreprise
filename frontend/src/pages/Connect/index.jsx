import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

function Connect() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onTouched" });

  const watchPassword = watch(["password", "confirm_password"]);
  const validPassword = watchPassword[0] === watchPassword[1];
  const [loader, setLoader] = useState(true);

  const onSubmit = (data) => {
    fetch("http://localhost:4200/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", JSON.stringify(token));
        data.error === undefined
          ? data && (window.location.href = `/accueil?id=${data.userId}`)
          : alert("Veuillez vérifier vos données");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div>
      <header>
        <h1>Groupomania Network</h1>
        <h2>Bienvenue, on vous attendez !</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="frame_email">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              pattern: {
                value:
                  /^[A-Za-z][-a-z0-9._]+[-a-z0-9]@[-a-z0-9]+[.]{1}[a-z]{2,5}$/,
                message: "Email n'est pas valide",
              },
              required: true,
            })}
          />
        </div>
        <p>{errors.email?.message}</p>
        <div className="frame_password">
          <label htmlFor="password">Mot de passe: </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
                message:
                  "Doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et une longueur d'au moins 12",
              },
              required: true,
            })}
          />
        </div>

        <p>{errors.password?.message}</p>

        <div className="frame_confirm_password">
          <label htmlFor="confirm_password">Confirme mot de passe: </label>
          <input
            id="confirm_password"
            type="password"
            {...register("confirm_password", {
              pattern: {
                value:
                  /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
                message: "Mot de passe non similaire",
              },
              required: true,
            })}
          />
        </div>

        {validPassword ? null : <p>{errors.confirm_password?.message}</p>}

        <div className="valid_form">
          <input value="Connexion" className="connection" type="submit" />
          <input value="Inscription" className="register" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Connect;
