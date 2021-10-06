import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "./styles.css";

const Landing = ({ setIsLoggedIn }) => {
  const history = useHistory({});

  const formSchema = yup.object().shape({
    email: yup

      .string()
      .required("E-mail required")
      .email("Must be a valid e-mail"),
    password: yup
      .string()
      .required("Password required")
      .min(8, "Min 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Should contain at least one letter, one number and a symbol."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((res) => {
        console.log(res);
        // localStorage.clear();
        setIsLoggedIn(true);
        localStorage.setItem("token", JSON.stringify(res.data.token));

        history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="form_login" onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            label="E-mail"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>

        <div>
          <TextField
            label="Password"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div>
          <Button color="primary" type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default Landing;
