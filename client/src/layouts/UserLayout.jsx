import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";

function UserLayout() {
  return (
    <div>
      <Navbar />
      <Container>
        <Outlet /> {/* Nested route renders here */}
      </Container>
      <Footer />
    </div>
  );
}

export default UserLayout;
