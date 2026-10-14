import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function DashBoard() {
  const username = localStorage.getItem("username");
  const [open, setopen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="body-sidebar">
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside className={`asidep ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* <aside className="asidep"> */}
        <div>
          <h3>
            {" "}
            <i className="fa-solid fa-user"></i>{username} 
          </h3>
        </div>

        <nav className="navp">
          <NavLink
            to="/dashboard"
            end
            onClick={() => {
              setopen(null);
              setSidebarOpen(false);
            }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-house-user"></i> داشبورد
          </NavLink>
          <div
            className="title"
            onClick={() => setopen(open === "product" ? null : "product")}
          >
            <i className="fa-solid fa-box"></i>
            <span>محصولات</span>
            <i
              className={`fa-solid fa-chevron-down menu-icon ${
                open === "product" ? "rotate" : ""
              }`}
            ></i>{" "}
          </div>

          <div className={`subtitle ${open === "product" ? "open" : ""}`}>
            <NavLink
              to="/dashboard/product/addproduct"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                setopen(null);
                setSidebarOpen(false);
              }}
            >
              <i className="fa-solid fa-square-plus"></i>
              ایجاد محصول
            </NavLink>{" "}
            <NavLink
              to="/dashboard/product/productlist"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                setopen(null);
                setSidebarOpen(false);
              }}
            >
              <i className="fa-solid fa-list"></i>
              لیست محصول
            </NavLink>
          </div>

          <div
            className="title"
            onClick={() => setopen(open === "category" ? null : "category")}
          >
            <i className="fa-solid fa-layer-group"></i>
            <span>دسته بندی</span>
            <i
              className={`fa-solid fa-chevron-down menu-icon ${
                open === "category" ? "rotate" : ""
              }`}
            ></i>{" "}
          </div>

          <div className={`subtitle ${open === "category" ? "open" : ""}`}>
            <NavLink
              to="/dashboard/category/addcategory"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                setopen(null);
                setSidebarOpen(false);
              }}
            >
              <i className="fa-solid fa-square-plus"></i>
              ایجاد دسته بندی
            </NavLink>{" "}
            <NavLink
              to="/dashboard/category/categorylist"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                setopen(null);
                setSidebarOpen(false);
              }}
            >
              <i className="fa-solid fa-list"></i>
              لیست دسته بندی ها
            </NavLink>
          </div>

          <NavLink
            to="/dashboard/order"
            onClick={() => {
              setopen(null);
              setSidebarOpen(false);
            }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-cart-arrow-down"></i> سفارشات
          </NavLink>

          <NavLink
            to="/dashboard/costumer"
            onClick={() => {
              setopen(null);
              setSidebarOpen(false);
            }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-users"></i>
            مشتریان
          </NavLink>
          <button className="btnlogout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </nav>
      </aside>

      <main className="mainp">
        <Outlet />
      </main>
    </div>
  );
}

export default DashBoard;
