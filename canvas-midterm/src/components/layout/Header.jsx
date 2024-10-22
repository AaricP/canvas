import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggle } from "../../context/ToggleProvider";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthProvider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Header() {
  const { toggle } = useToggle();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      await logout();
      navigate("/");
    }
  };

  return (
    <div>
      <div id="profile" style={{ display: user ? "inline" : "none" }}>
        <Link style={{ textDecoration: "none" }} to="/profilepage">
          <div style={{ paddingLeft: "5px" }}>Profile</div>
          <AccountBoxIcon style={{ fontSize: "50px" }} />
        </Link>
      </div>
      <MenuIcon
        id="menuIcon"
        onClick={toggle}
        style={{ display: user ? "inline" : "none" }}
      />
      <div id="login" style={{ display: user ? "inline" : "none" }}>
        <Button onClick={handleSubmit}>
          <LogoutIcon />
          Logout &nbsp;&nbsp;
        </Button>
      </div>
    </div>
  );
}
