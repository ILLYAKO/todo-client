import React from "react";

type Props = TodoProps & {
    handleCheckBox: (todo: ITodo) => void;
};

const Todo: React.FC<Props> = ({
    todo,
    handleCheckBox,
}) => {
    return (
        <div className="form-check">
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => handleCheckBox(todo)}
                    className="form-check-input"
                />
                <label className="lh-lg" htmlFor="checkbox">{todo.name}</label>
            </div>
    );
};

export default Todo;
