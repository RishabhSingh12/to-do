import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import ToDo from "./components/ToDo.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add task
  ///////////////////////////
  const addTask = () => {
    if (newTask) {
      let index = toDo.length + 1;
      let newEntry = { id: index, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    } else {
      alert("Please enter a task name first !");
    }
  };

  // Delete task
  ///////////////////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark task as done or completed
  ///////////////////////////
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update task
  ///////////////////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h1 style={{ fontWeight: "700" }}>To Do List App</h1>
      <br />
      <br />

      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}

      {toDo && toDo.length ? (
        ""
      ) : (
        <h2 style={{ marginTop: "30px" }}>No Tasks added ...</h2>
      )}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
