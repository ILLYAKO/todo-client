import React from "react";

type Props = TodoProps & {
    handleCheckBox: (todo: ITodo) => void;
};

const Todo: React.FC<Props> = ({
    todo,
    handleCheckBox,
}) => {
    return (
        <div className="Card">
            <div className="Card-text">
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => handleCheckBox(todo)}
                />
                <h1>{todo.name}</h1>
            </div>
        </div>
    );
};

export default Todo;
