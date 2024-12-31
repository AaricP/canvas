import { Button } from "@mui/material";
import TextareaRows from "../components/common/TextArea";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function HomePage() {
  const { user } = useAuth()
  return (
    <>
    <div style={{ display: !user ? "inline" : "none" }}>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }}>
        <Link to="loginpage">
          <Button id="login">
            Login
            <LoginIcon></LoginIcon>
          </Button>
        </Link>
      </div>
      </div>

      <h2>HomePage</h2>
      <p>kskldjfasdl jas;l fjsklj fskldjf sdjf slfjasklfjs</p>
      <p>kskldjfasdl jas;l fjsklj fskldjf sdjf slfjasklfjs</p>
      <p>kskldjfasdl jas;l fjsklj fskldjf sdjf slfjasklfjs</p>
      <p>kskldjfasdl jas;l fjsklj fskldjf sdjf slfjasklfjs</p>
      <p>kskldjfasdl jas;l fjsklj fskldjf sdjf slfjasklfjs</p>
    </>
  );
}
