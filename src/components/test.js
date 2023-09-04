import React, { useState, useEffect } from "react";

const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    trying();
  });
  const trying = async () => {
    let details = {
      email: "email1@email.com",
      password: "password1",
    };
    let data = await fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    data = await data.json();
    console.log(data);
    localStorage.setItem("taskManagerUser", JSON.stringify(data[0]));
    if (data[0].result === "success") {
      console.log("TaskManager");
    } else {
      window.alert("Invalid email address");
    }
    setData(data);
  };
  console.log(data);
  return (
    <>
      <h1>Testing</h1>
    </>
  );
};

export default Test;
