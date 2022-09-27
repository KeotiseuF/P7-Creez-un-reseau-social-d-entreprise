import { NavAccueil } from "../../components/Nav";

function Home() {
  const token = JSON.parse(localStorage.getItem("token"));
  
  fetch("http://localhost:4200/api/posts", {
    headers: {
    Authorization: `Bearer ${token}`,
    },
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => {
    console.log(data)
  }) 
  .catch(function(err) {
    console.error("Une erreur est survenue");
  });
  return (
    <header>
      <NavAccueil />
    </header>
  );
}

export default Home;
