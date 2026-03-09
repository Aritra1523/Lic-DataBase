import { useState } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {

    if (loading) return; // prevent double click

    setLoading(true);

    try {

      const user = await account.get();

      if (user) {
        alert("Already logged in");
        navigate("/dashboard");
        return;
      }

    } catch {
      try {

        await account.createEmailPasswordSession(email, password);

        alert("Login Success");
        navigate("/dashboard");

      } catch (error) {

        console.log(error);
        alert(error.message);

      }
    }

    setLoading(false);
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

        <button
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}

export default Login;