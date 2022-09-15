import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { NavRegisterOrConnect } from "../../components/Nav";

function Home() {
  const [loader, setLoader] = useState(true);

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
        <h2>Bienvenue, on vous attend !</h2>
      </header>
      <NavRegisterOrConnect />
    </div>
  );
}

export default Home;
