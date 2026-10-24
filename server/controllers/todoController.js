const Todo = require("../models/todo");

// GET ALL TODOS
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};


// CREATE TODO
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        const newTodo = new Todo({
            title
        });

        await newTodo.save();

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE TODO
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE TODO
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, isCom } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                isCom
            },
            {
                new: true
            }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};