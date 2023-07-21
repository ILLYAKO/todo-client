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
            <div className="container-sm mt-5 p-5 pt-3 bg-light border border-dark">
                <div className="row pb-5">
                    <div className="col">
                        <h1 className="fs-2 fw-semibold">Marvelous v2.0</h1>
                    </div>
                    <div className="col-auto">
                        <button
                            onClick={handleDeleteAll}
                            className="btn btn-link"
                        >
                            Delete all tasks
                        </button>
                    </div>
                </div>
                <div className="row g-2 pt-1 pb-3">
                    <div className="col">
                        <AddTodo saveTodo={handleSaveTodo} />
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={handleChangeSearch}
                            value={searchInput}
                            className="form-control border-dark "
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h2 className="fs-4 fw-bold ps-3">To Do</h2>
                        <hr className="border-black opacity-100 mt-1 mb-1" />
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
                        <h2 className="fs-4 fw-bold ps-3">Done</h2>
                        <hr className="border-black opacity-100 mt-1 mb-1" />
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
