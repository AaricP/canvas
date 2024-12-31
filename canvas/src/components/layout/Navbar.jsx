import { Link } from "react-router-dom";
import { useToggle } from "../../context/ToggleProvider";
import { useAuth } from "../../context/AuthProvider";
import usePermissions from "../../hooks/usePermissions";

export default function Navbar() {
  const { isOpen, toggle } = useToggle();
  const { user } = useAuth();
  const { authorized } = usePermissions();

  const handleCloseNav= () => {
    toggle();
  }

  return (
    <header style={{ display: isOpen ? "block" : "none" }}>
      <nav id="navbar" style={{ display: user ? "block" : "none" }}>
        <ul>
          <li>
            <Link onClick={handleCloseNav} to="/modules">Modules</Link>
          </li>
          <li>
            <Link onClick={handleCloseNav} to="/announcements">Announcements</Link>
          </li>
          <li>
            <Link onClick={handleCloseNav} to="/pages">Pages</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
