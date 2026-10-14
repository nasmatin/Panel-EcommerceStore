// pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="body-notfound">
      <h1>404</h1>
      <h2>صفحه مورد نظر پیدا نشد</h2>
      
      <Link to="/" 
      className="backtohome">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFound;