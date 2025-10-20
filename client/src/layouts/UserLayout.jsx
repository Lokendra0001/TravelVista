import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Nested route renders here */}
      </main>
    </div>
  );
}

export default UserLayout;
