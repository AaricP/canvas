import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import { ToggleProvider } from "../../context/ToggleProvider";

export default function Layout() {
  return (
    <>
        <ToggleProvider>
          <div id="header">
            <Header />
          </div>
          <div id="display">
            <Navbar />
            <main>
              <Outlet />
            </main>
          </div>
        </ToggleProvider>
    </>
  );
}
