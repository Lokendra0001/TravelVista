import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { useEffect } from "react";

function AdminLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);
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
