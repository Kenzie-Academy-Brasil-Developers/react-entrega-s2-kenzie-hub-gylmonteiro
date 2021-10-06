import axios from "axios";
import { useEffect, useState } from "react";
import Techs from "../../Techs";

const Home = ({ isLoggedIn }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    return JSON.parse(localToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `barear ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {isLoggedIn && (
        <div>
          <h2> - Bem vindo(a), {user.name}!</h2>
          <Techs token={token} user={user} />
        </div>
      )}
      {isLoggedIn === false && <h1>Você não está logado.</h1>}
    </>
  );
};
export default Home;
