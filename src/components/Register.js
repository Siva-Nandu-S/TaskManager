import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async() => {
    let details = {
        name: name,
        email: email,
        password: password
    }
    let data = await fetch(`http://localhost:3001/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    data = await data.json();
    console.log(data);
    if (data.result === "error") {
      window.alert("Invalid email address");
    } else {
      window.alert("Successfully registered");
      navigate('/login');
      window.location.reload(false);
    }
  };
  return (
    <>
      <div class="registration-form">
        <h2>Registration</h2>
        <form>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <label for="email">Email:</label>
          <input
            type="email"
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

          <button type="submit" onClick={formSubmit}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
