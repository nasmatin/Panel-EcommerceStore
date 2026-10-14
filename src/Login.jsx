import { useState } from "react";
import {useNavigate} from "react-router";
import API_BASE_URL from "./api/api.jsx";
function LoginUser() {
  const navigate=useNavigate();
  //set state for login form
  const [loginform, setloginform] = useState({
    username: "",
    password: "",
  });
  //set state for error & loading & success 
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  //set inputchange for input
  const inputchange = (e) => {
    const { name, value } = e.target;
    setloginform((previnput) => ({
      ...previnput,
      [name]: value,
    }));
  };
  //set inputsubmit for fetch
  const inputsubmit = async (e) => {
    e.preventDefault();

    setloading(true);
    seterror("");
    setsuccess("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginform.username,
          password: loginform.password,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "ورود ناموفق");
      }
      if (result.token) {
        localStorage.setItem("token", result.token);
          localStorage.setItem("username", loginform.username);
        console.log("توکن ذخیره شد", result.token);
      }
      setsuccess("ورود موفق!");
      navigate("/dashboard");
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };
  //paint material ui
  return (
    <div className="body">
      <form onSubmit={inputsubmit} className="form_container">
        <h2>ورود به سیستم</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input
          className="input"
          type="text"
          name="username"
          value={loginform.username}
          placeholder="نام کاربری"
          onChange={inputchange}
          required
        ></input>
        <input
          className="input"
          type="password"
          name="password"
          value={loginform.password}
          placeholder="پسورد"
          onChange={inputchange}
          required
        ></input>
        <button  
        type="submit"
        className="button-container" 
        disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
export default LoginUser;
