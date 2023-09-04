import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   localStorage.setItem('taskManagerUser', JSON.stringify({email: email, result : "success"}));
  // }, [email]);

  const userLogin = async () => {
    let details = {
      email: email,
      password: password,
    };
    let data = await fetch('http://localhost:3001/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    data = await data.json();
    console.log(data);
    if (data.result === "error") {
      window.alert("Invalid email address");
    } else {
      window.alert("Successfully Logged in");
      localStorage.setItem("taskManagerUser",JSON.stringify({email:email}));
      navigate('/');
      window.location.reload(false);
      
    }
  };

  return (
    <>
      <div class="login-form">
        <h2>Login</h2>
        <form>
          <label for="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={userLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
