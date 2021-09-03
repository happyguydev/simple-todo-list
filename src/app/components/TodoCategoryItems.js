import React from 'react';
import { XIcon } from '@heroicons/react/solid'

const TodoCategoryItems = (props) => {
    const onClickDeleteItem = (e, item) => {
        e.stopPropagation();
        props.onHandleDeleteCategory(item);
    }

    return (
        <div className="flex flex-col mt-4">
            {props.list.map((item, index) => {
                return (
                    <button
                        key={index}
                        className="relative py-3 px-6 text-white border bg-gray-600 mb-2 rounded-md shadow-md"
                        // className="relative text-black bg-transparent border border-solid border-black font-bold text-base py-3 px-6 rounded outline-none mb-1 truncate" type="button"
                        onClick={() => props.onHandleSelectCategory(item)}
                    >
                        {item}
                        <XIcon className="absolute top-3 right-1 w-6 h-6 cursor-pointer" onClick={(e) => onClickDeleteItem(e, item)} />
                    </button>
                )
            })}
        </div>
    );
}

export default TodoCategoryItems;
