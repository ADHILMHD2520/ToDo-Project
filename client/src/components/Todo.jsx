
import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";

const API_URL = "http://localhost:5000/todos";

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [allData, setAllData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [tempData, setTempData] = useState([]);
    const [error, setError] = useState("");

    // GET ALL TODOS
    const fetchTodos = async () => {
        try {
            const res = await axios.get(API_URL);

            setAllData(res.data);
            setTempData(res.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // GET TODOS WHEN PAGE LOADS
    useEffect(() => {
        fetchTodos();
    }, []);

    // INPUT CHANGE
    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    // ADD TODO
    const handleSubmit = async () => {
        if (inputData.trim() === "") {
            setError("Please enter a task");
            return;
        }

        try {
            await axios.post(API_URL, {
                title: inputData
            });

            setInputData("");
            setError("");

            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // DELETE TODO
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);

            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // START EDITING
    const onHandleEdit = (todo) => {
        setEditInput(todo.title);
        setEditId(todo._id);
    };

    // UPDATE TODO
    const onHandleUpdate = async () => {
        if (editInput.trim() === "") {
            return;
        }

        try {
            const todo = allData.find((item) => item._id === editId);

            await axios.put(`${API_URL}/${editId}`, {
                title: editInput,
                isCom: todo.isCom
            });

            setEditInput("");
            setEditId(null);

            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    // CHANGE TODO STATUS
    const handleStatus = async (todo) => {
        try {
            await axios.put(`${API_URL}/${todo._id}`, {
                title: todo.title,
                isCom: !todo.isCom
            });

            fetchTodos();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // FILTER TODOS
    const onHandleFilter = (data) => {
        if (data === "completed") {
            const res = tempData.filter(
                (value) => value.isCom === true
            );

            setAllData(res);
        } else if (data === "pending") {
            const res = tempData.filter(
                (value) => value.isCom === false
            );

            setAllData(res);
        } else {
            setAllData(tempData);
        }
    };

    return (
        <div className="todo-page">

            <div className="header">
                <h1>Todo App</h1>
            </div>

            <div className="todo-container">

                <div className="filter-sections">
                    <button
                        className="active-filter"
                        onClick={() => onHandleFilter("all")}
                    >
                        All
                    </button>

                    <button
                        onClick={() => onHandleFilter("pending")}
                    >
                        Pending
                    </button>

                    <button
                        onClick={() => onHandleFilter("completed")}
                    >
                        Completed
                    </button>
                </div>

                <div className="tasks-header">

                    <h2>Tasks</h2>

                    <div className="add-task-section">

                        <input
                            type="text"
                            value={inputData}
                            onChange={handleChange}
                            placeholder="Enter a task"
                        />

                        {error && (
                            <span className="error-message">
                                {error}
                            </span>
                        )}

                        <button
                            className="add-task-btn"
                            onClick={handleSubmit}
                        >
                            Add Task
                        </button>

                    </div>

                </div>

                {editId !== null && (
                    <div className="edit-section">

                        <input
                            type="text"
                            value={editInput}
                            onChange={(e) =>
                                setEditInput(e.target.value)
                            }
                        />

                        <button onClick={onHandleUpdate}>
                            Update
                        </button>

                    </div>
                )}

                <div className="task-list">

                    {allData.map((val) => (

                        <div
                            key={val._id}
                            className="task-card"
                        >

                            <input
                                type="checkbox"
                                checked={val.isCom}
                                onChange={() =>
                                    handleStatus(val)
                                }
                            />

                            <span
                                className={
                                    val.isCom
                                        ? "task-title completed-task"
                                        : "task-title"
                                }
                            >
                                {val.title}
                            </span>

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    onHandleEdit(val)
                                }
                            >
                                ✎
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(val._id)
                                }
                            >
                                ×
                            </button>

                            <div
                                className={
                                    val.isCom
                                        ? "status completed-status"
                                        : "status pending-status"
                                }
                            >
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Todo;
