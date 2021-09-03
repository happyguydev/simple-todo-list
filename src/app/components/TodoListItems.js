import React from "react";
import { TrashIcon } from "@heroicons/react/solid";

const TodoListItems = (props) => {
    return (
        <div className="flex flex-col sm:max-w-xl mt-4 mx-auto">
            {props.list.map((item, index) => {
                return (
                    <div key={index} className="relative pl-6 pr-10 py-4 text-gray-600 border bg-gray-100 mb-2 rounded-md shadow-md">
                        <p>{item}</p>
                        <TrashIcon className="absolute top-4 right-4 w-6 h-6 cursor-pointer" onClick={() => props.onHandleDeleteTodoItem(item)} />
                    </div>
                )
            })}
        </div>
    );
}

export default TodoListItems;
