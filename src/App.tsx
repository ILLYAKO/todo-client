import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteAll } from "./API";

const App: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isCheckedBox, setIsCheckedBox] = useState<boolean>(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = (): void => {
        getTodos()
            .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
            .catch((err: Error) => console.log(err));
    };

    const handleChangeSearch = (e: any) => {
        e.preventDefault();
        setSearchInput(e.target.value.toLowerCase());
    };

    const handleCheckBox = (todo: ITodo) => {
        setIsCheckedBox(!isCheckedBox);
        let newTodo = { ...todo, status: !todo.status };
        updateTodo(newTodo)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated");
                }
                setTodos(data.todos);
            })
            .catch((err) => console.log(err));
    };

    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault();
        addTodo(formData)
            .then(({ status, data }) => {
                if (status !== 201) {
                    throw new Error("Error! Todo not saved");
                }
                setTodos(data.todos);
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteAll = (): void => {
        let text = "Are You sure? Press an OK button!\nOr press Cancel.";
        // eslint-disable-next-line no-restricted-globals
        if (confirm(text) === true) {
            deleteAll()
                .then(({ status, data }) => {
                    if (status !== 200) {
                        throw new Error("Error! Todo not deleted");
                    }
                    setTodos(data.todos);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Marvelous v2.0</h1>
                    </div>
                    <div className="col">
                        <button onClick={handleDeleteAll}>
                            Delete all tasks
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <AddTodo saveTodo={handleSaveTodo} />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={handleChangeSearch}
                            value={searchInput}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h2>To Do</h2>
                        <hr />
                        {todos
                            .filter((item) => {
                                if (searchInput === "") {
                                    return !item.status;
                                } else {
                                    return (
                                        item.name
                                            .toLowerCase()
                                            .includes(searchInput) &&
                                        !item.status
                                    );
                                }
                            })
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((todo: ITodo) => (
                                <TodoItem
                                    key={todo._id}
                                    handleCheckBox={handleCheckBox}
                                    todo={todo}
                                />
                            ))}
                    </div>
                    <div className="col">
                        <h2>Done</h2>
                        <hr />
                        {todos
                            .filter((item) => {
                                if (searchInput === "") {
                                    return item.status;
                                } else {
                                    return (
                                        item.name
                                            .toLowerCase()
                                            .includes(searchInput) &&
                                        item.status
                                    );
                                }
                            })
                            .sort((a, b) =>
                                b.updatedAt
                                    .toString()
                                    .localeCompare(a.updatedAt.toString())
                            )
                            .slice(0, 10)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((todo: ITodo) => (
                                <TodoItem
                                    key={todo._id}
                                    handleCheckBox={handleCheckBox}
                                    todo={todo}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;
