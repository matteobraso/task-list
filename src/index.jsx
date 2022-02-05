/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../assets/stylesheets/application.scss';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      toDoToAdd: "",
      counter: 0
    };
    this.handleClick.bind(this);
    this.onTextChange.bind(this);
  }

  onTextChange(event) {
    this.setState({ toDoToAdd: event.currentTarget.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const toDoList = this.state.toDoList;
    toDoList.push(this.state.toDoToAdd);
    this.setState({
      toDoList,
      counter: this.state.counter + 1
    });
  }

  counterUpdate = (isDone) => {
    if (isDone === true) { this.setState({ counter: this.state.counter - 1 }); } else { this.setState({ counter: this.state.counter + 1 }); }
  }

  render() {
    return (
      <>
        <div>
          <h1>To Do List</h1>
          <form>
            <input
              type="text"
              defaultValue={this.state.toDoToAdd}
              onChange={event => this.onTextChange(event)}
            />

            <button
              type="submit"
              onClick={(event) => {
                return this.handleClick(event);
              }}
            >
              Add
            </button>
          </form>

          <h2 id="list-heading">
            {this.state.counter}
            {' '}
            tasks remaining
          </h2>

          <ul>
            {this.state.toDoList.map((element, index) => {
              return <Task key={index} toDoName={element} counterUpdate={isDone => this.counterUpdate(isDone)} />;
            })}
          </ul>
        </div>
      </>
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { isDone: false };
  }

  handleClick = () => {
    const isDone = !this.state.isDone;
    this.setState({ isDone });
    this.props.counterUpdate(isDone);
  }

  render() {
    return (
      <>
        <li
          style={this.state.isDone ? { textDecoration: "line-through" } : null}
        >
          <input
            id="todo-0"
            type="checkbox"
            onClick={() => {
              return this.handleClick();
            }}
          />
          {this.props.toDoName}
        </li>
      </>
    );
  }
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<ToDoList />, root);
}
