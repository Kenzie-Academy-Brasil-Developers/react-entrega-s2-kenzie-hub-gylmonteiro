import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import "./styles.css";

const RegisterForm = () => {
  const history = useHistory({});

  const formSchema = yup.object().shape({
    email: yup

      .string()
      .required("E-mail required")
      .email("Must be a valid e-mail"),
    name: yup
      .string()
      .required("Name required")
      .min(5, "Min 5 characters")
      .matches(
        "^[a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ ]+$",
        "Can contain just small cap letters"
      ),
    password: yup
      .string()
      .required("Password required")
      .min(8, "Min 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Should contain at least one letter, one number and a symbol."
      ),
    bio: yup.string().required("Bio required"),
    contact: yup.string().required("Contact required"),
    course_module: yup.string().required("Course module required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((res) => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <form className="form_register" onSubmit={handleSubmit(handleForm)}>
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
              label="Name"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
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
            <TextField
              label="Bio"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
            />
          </div>
          <div>
            <TextField
              label="Contact"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("contact")}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
          </div>

          <div>
            <TextField
              id="select"
              label="Course module"
              margin="normal"
              variant="outlined"
              size="small"
              color="primary"
              {...register("course_module")}
              error={!!errors.course_module}
              helperText={errors.course_module?.message}
              select
            >
              <MenuItem value="1º_Module">1º module</MenuItem>
              <MenuItem value="2º_Module">2º module</MenuItem>
              <MenuItem value="3º_Module">3º module</MenuItem>
              <MenuItem value="4º_Module">4º module</MenuItem>
            </TextField>
          </div>
          <div>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegisterForm;
