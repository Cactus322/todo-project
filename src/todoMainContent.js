import React from 'react';
import ReactDOM from "react-dom";
//УБРАТЬ И ДОБАВИТЬ SQL

class TodoMainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.todoList = [];
        this.listInput = [];
        this.keyGen = 1;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.updateListAmount = this.updateListAmount.bind(this);
    }

    todoArray(event) {
        this.todoList.push(event);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (/[^\s]/gim.test(document.querySelector('.todo-input').value) === true) {
            this.todoArray(this.state.value.replace(/^\s+|\s+$/g, ""));
            document.querySelector('.todo-input').value = '';

            document.querySelector('.todo-input').classList.add('todo-input_open');
            document.querySelector('.todo-input__footer').style.display = "block";

            console.log(this.keyGen)
            this.listInput = (
                <div>
                    {this.todoList.map((item, index) => (
                        <li className={"todo-list list-" + index} key={this.keyGen}>
                            <input id={"todoListCheckboxId-" + index} type="checkbox"/>
                            <label className="todo-list__checkbox" htmlFor={"todoListCheckboxId-" + index}> </label>
                            <label>{item}</label>
                            <button className={"todo-list__button list-" + index} onClick={this.handleClear}> </button>
                        </li>
                    ))}
                </div>
            )

            this.keyGen++;

            this.updateListAmount();
            this.handleChange();

            /*ReactDOM.render (
                this.listInput,
                document.querySelector('.todo-list-form')
            )*/
        }
    }

    handleClear(event) {
        event.preventDefault();
        let removeTodoClassName = document.querySelector("." + event.target.classList[1]);
        ReactDOM.unmountComponentAtNode(removeTodoClassName);
        removeTodoClassName.parentNode.removeChild(removeTodoClassName);

        let removeTodoIndex = Number(event.target.classList[1].match(/\d+/g));
        this.todoList.splice(removeTodoIndex, 1);
        this.listInput.props.children.splice(removeTodoIndex, 1);


        console.log(this.listInput)
        console.log(this.todoList)

        if (removeTodoIndex < (this.todoList.length)) {
            for (let i = removeTodoIndex + 1; i < (this.todoList.length + 1); i++) {
                document.querySelectorAll(".list-" + i).forEach(element => {
                    element.classList.remove("list-" + i)
                    element.classList.add("list-" + (i - 1));
                })

            }
        }
        
        this.updateListAmount();
    }

    updateListAmount() {
        document.querySelector(".todo-input__footer span").innerHTML = this.todoList.length.toString();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input className="todo-input" placeholder="Что нужно сделать?" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>
                <form >
                    <ul className="todo-list-form">
                        {this.listInput}
                    </ul>
                </form>
                <footer className="todo-input__footer">
                    <div>
                        <span></span>
                        <div className="todo-input__footer_button">
                            <button>All</button>
                            <button>Active</button>
                            <button>Completed</button>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default TodoMainContent;