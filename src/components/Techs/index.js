import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, MenuItem } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import "./styles.css";

const Techs = ({ token, user }) => {
  //   const history = useHistory({});
  //   const sendTo = (user) => history.push(`/`);

  const formSchema = yup.object().shape({
    title: yup.string().required("Your title must have a name."),
    status: yup.string().required("You must inform your status level at it."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  //   const [token, setToken] = useState(
  //     JSON.parse(localStorage.getItem("token")) || ""
  //   );

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        showTechs();
      })
      .catch((err) => console.log(err));
  };

  const showTechs = () => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${user.id}`)
      .then((response) => setTechs(response.data.techs));
  };

  const [techs, setTechs] = useState([]);

  const handleDeleteTech = (techId) => {
    console.log(techId);

    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${techId}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(showTechs)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <form className="form_create_techs" onSubmit={handleSubmit(handleForm)}>
          <div>
            <TextField
              label="Title"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </div>
          <div>
            <TextField
              id="select"
              label="Status"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
              select
            >
              <MenuItem value="begginer">Begginer</MenuItem>
              <MenuItem value="intermediary">Intermediary</MenuItem>
              <MenuItem value="master">Master</MenuItem>
            </TextField>
          </div>
          <div>
            <Button
              onClick={showTechs}
              color="secondary"
              type="submit"
              variant="contained"
            >
              Show Techs
            </Button>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
        <ul>
          {techs &&
            techs.map((item, index) => {
              return (
                <>
                  <li key={index}>
                    <p>Title: {item.title}</p>
                    <p>Status: {item.status}</p>
                    <Button
                      type="button"
                      onClick={() => handleDeleteTech(item.id)}
                    >
                      Delete tech
                    </Button>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
};
export default Techs;
