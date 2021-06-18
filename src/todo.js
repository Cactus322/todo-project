import TodoMainContent from './todoMainContent';
import './todo.css';
import React from "react";

function Todo() {
    return (
        <div className="todo">
            <header className="todo-header">
                <h1>todos</h1>
            </header>
            <main>
                <TodoMainContent />
            </main>
            <footer className="todo-footer">
                <p>Double-click to edit a todo</p>
                <p>Created by<a href="https://github.com/Cactus322?tab=repositories"> Gor Momchyan</a></p>
            </footer>
        </div>
    );
}


export default Todo;
