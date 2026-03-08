import { useState } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await account.deleteSessions();
      await account.createEmailPasswordSession(email, password);

      alert("Login Success");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(err.message);
      alert("Login Failed");
      
    }
  };

  return (
  <div className="login-container">
  <div className="login-card">

    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={login}>Login</button>

  </div>
</div>
  );
}
export default Login;
