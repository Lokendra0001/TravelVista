import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <header>User Header</header>
      <main>
        <Outlet /> {/* Nested route renders here */}
      </main>
    </div>
  );
}

export default UserLayout;
