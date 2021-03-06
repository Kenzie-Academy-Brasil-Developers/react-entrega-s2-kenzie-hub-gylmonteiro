import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();

  const sendTo = (path) => {
    history.push(path);
  };

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <MenuItem onClick={() => sendTo("/")}>Logar</MenuItem>
            <MenuItem onClick={() => sendTo("/register")}>Registrar</MenuItem>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
export default Header;
