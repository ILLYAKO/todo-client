import axios, { AxiosResponse } from "axios";


const baseUrl: string = process.env.REACT_APP_API_URL as string; 


export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "todos"
        );
        return todos;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage);
    }
};

export const addTodo = async (
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            status: false,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        };
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "add-todo",
            todo
        );
        return saveTodo;
    } catch (error) {
        console.log(error);

        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage);
    }
};

export const updateTodo = async (
    todo: ITodo,
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}edit-todo/${todo._id}`,
            todo
        );
        return updatedTodo;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage);
    }
};

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}delete-todo/${_id}`
        );
        return deletedTodo;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage);
    }
};

export const deleteAll = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedAll: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}delete-all`
        );
        return deletedAll;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(errorMessage);
    }
};
