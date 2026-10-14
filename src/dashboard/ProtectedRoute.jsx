import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // برای تست: اگر در localStorage مقدار token وجود داشته باشد یعنی لاگین است
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    // اگر لاگین نبود، بفرست به صفحه لاگین
    return <Navigate to="/login" replace />;
  }

  // اگر لاگین بود، صفحات فرزند را نشان بده
  return <Outlet />;
}

export default ProtectedRoute;