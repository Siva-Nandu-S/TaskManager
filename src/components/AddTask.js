import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// import url from "./Service";

const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateTasks = async () => {
    const user = JSON.parse(localStorage.getItem("taskManagerUser"));
    let details = {
      title: title,
      description: description,
      email: user.email
    };
    console.log(details);

    let data = await fetch(`http://localhost:3001/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    data = await data.json();
    if (data.result === "success") {
      navigate('/');
      window.location.reload(false);
    }
    if (data.status === 400) {
      window.alert("Try different time");
    }
  };

  return (
    <>
      <div class="task-form">
        <h2>Add Task</h2>
        <form>
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" onClick={updateTasks}>
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
