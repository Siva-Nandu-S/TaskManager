import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  //---------------------------------------

  let [details, setData] = useState(null);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("taskManagerUser"));
    let data = await fetch(`http://localhost:3001/data/${user.email}`,{
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    });
    data = await data.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  //---------------------------------------

  // convertTaskFromtoDo_to_Doing
  // convertTaskFromDoing_to_Done
  function convertTaskFromDoing_to_Done(id) {
    const user = JSON.parse(localStorage.getItem("taskManagerUser"));
    let details = {
      id : id,
      email: user.email
    }
    fetch(`http://localhost:3001/done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    window.location.reload(true);
  }

  function convertTaskFromtoDo_to_Doing(id) {
    const user = JSON.parse(localStorage.getItem("taskManagerUser"));
    let details = {
      id : id,
      email : user.email
    }
    fetch(`http://localhost:3001/doing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    window.location.reload(true);
  }

  function deleteTask(id) {
    const user = JSON.parse(localStorage.getItem("taskManagerUser"));
    let details = {
      id : id,
      email : user.email
    }
    fetch(`http://localhost:3001/data/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    window.location.reload(true);
  }

  return (
    <div>
      <div class="task-board">
        {details ? (
          <>
            <div class="task-column">
              <h2>To-Do</h2>
              <ul class="task-list" id="todo">
                <div>
                  {details &&
                    details.to_do.map(({ _id, title, description }) => {
                      return (
                        <li class="task" key={_id}>
                          <span class="task-title">{title}</span>
                          <p>{description}</p>
                          <button
                            onClick={() => convertTaskFromtoDo_to_Doing(_id)}
                          >
                            Ready?
                          </button>
                        </li>
                      );
                    })}
                </div>
              </ul>
              <div>
                <Link to="/task">Add Task</Link>
              </div>
            </div>
            <div class="task-column">
              <h2>Doing</h2>
              <ul class="task-list" id="doing">
                <div>
                  {details.doing.map(({ _id, title, description }) => {
                    return (
                      <li class="task" key={_id}>
                        <span class="task-title">{title}</span>
                        <p>{description}</p>
                        <button
                          onClick={() => convertTaskFromDoing_to_Done(_id)}
                        >
                          Done?
                        </button>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
            <div class="task-column">
              <h2>Done</h2>
              <ul class="task-list" id="done">
                <div>
                  {details.done.map(({ _id,title, description }) => {
                    return (
                      <>
                        <li class="task done-tasks" key={_id}>
                          <span class="task-title">{title}</span>
                          <p>{description}</p>
                          <button onClick={() => deleteTask(_id)}>Delete</button>
                        </li>
                      </>
                    );
                  })}
                </div>
              </ul>
            </div>
          </>
        ) : (
          <div>Contents are loading</div>
        )}
      </div>
    </div>
  );
};

export default Home;
