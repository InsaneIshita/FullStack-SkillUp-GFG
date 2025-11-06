import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Card,
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
    };
  }

  updateInput(value) {
    this.setState({ userInput: value });
  }

  addItem() {
    if (this.state.userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: this.state.userInput,
      };
      this.setState((prevState) => ({
        list: [...prevState.list, newItem],
        userInput: "",
      }));
    }
  }

  deleteItem(key) {
    this.setState({
      list: this.state.list.filter((item) => item.id !== key),
    });
  }

  editItem(index) {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the task:", todos[index].value);
    if (editedTodo && editedTodo.trim() !== "") {
      todos[index].value = editedTodo;
      this.setState({ list: todos });
    }
  }

  render() {
    return (
      <div
        style={{
          fontFamily: "'Arial',sans-serif",
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, rgb(5, 134, 80), #09478e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            padding: "20px 15px",
          }}
        >
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-light">To-Do List</h2>
              <p className="text-light">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            
            <ListGroup variant="flush" className="mb-4">
              {this.state.list.length === 0 ? (
                <p className="text-center text-muted">No tasks yet</p>
              ) : (
                this.state.list.map((item, index) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-2 rounded text-light"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, background 0.3s",
                    }}
                  >
              <span>{item.value}</span>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => this.editItem(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => this.deleteItem(item.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
            ))
              )}
          </ListGroup>

          
          <InputGroup>
            <FormControl
              placeholder="Add a new task..."
              value={this.state.userInput}
              onChange={(e) => this.updateInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && this.addItem()}
            />
            <Button variant="primary" onClick={() => this.addItem()}>
              Add
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
      </div >
    );
  }
}

export default App;
