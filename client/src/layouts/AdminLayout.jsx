import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <header>Admin Header</header>
      <main>
        <Outlet /> {/* Nested route renders here */}
      </main>
    </div>
  );
}

export default AdminLayout;
