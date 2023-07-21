import React, { useState } from "react";

type Props = {
    saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
    const [formData, setFormData] = useState<ITodo | {}>();

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });
    };

    return (
        <form onSubmit={(e) => saveTodo(e, formData)} className="row g-2">
            <div className="col-auto">
                <input
                    onChange={handleForm}
                    type="text"
                    id="name"
                    className="form-control border-dark"
                />
            </div>
            <div className="col-auto">
                <button
                    disabled={formData === undefined ? true : false}
                    className="btn btn-outline-dark text-black"
                    style={{ backgroundColor: "rgb(207, 226, 243)" }}
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
