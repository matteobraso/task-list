/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../assets/stylesheets/application.scss";

const ToDoList = () => {
  const [count, setCount] = useState(0);
  const [toDoList, setToDoList] = useState([]);
  const [toDoToAdd, setToDoToAdd] = useState("");

  const onTextChange = () => {
    setToDoToAdd(toDoToAdd);
  };

  const handleClick = () => {
    const newList = toDoList.push(toDoToAdd);
    setToDoList(newList);
    setCount(count + 1);
  };

  const counterUpdate = (isDone) => {
    if (isDone === true) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <>
      <div>
        <h1>To Do List</h1>
        <form>
          <input type="text" defaultValue={toDoToAdd} onChange={onTextChange} />

          <button type="submit" onClick={handleClick}>
            Add
          </button>
        </form>

        <h2 id="list-heading">
          {count}
          tasks remaining
        </h2>

        <ul>
          {toDoList.map((element) => {
            return (
              <Task
                key={element.id}
                toDoName={element}
                counterUpdate={isDone => counterUpdate(isDone)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

const Task = (props) => {
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    setIsDone(!isDone);
    props.counterUpdate(isDone);
  };
  return (
    <>
      <li style={isDone ? { textDecoration: "line-through" } : null}>
        <input
          id="todo-0"
          type="checkbox"
          onClick={() => {
            return handleClick();
          }}
        />
        {props.toDoName}
      </li>
    </>
  );
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(<ToDoList />, root);
}
