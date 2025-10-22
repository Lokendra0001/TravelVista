import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";

function AdminLayout() {
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

export default AdminLayout;
