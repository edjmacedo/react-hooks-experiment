import React, { useContext } from 'react';
import TodosContext from '../context';

export default function TodoList() {
    const { state, dispatch } = useContext(TodosContext);
    const title = state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing to do';

    return (
        <div className="container mx-auto mx-w-md text-center font-mono">
            <h1 className="text-bold">{title}</h1>
            <ul className="list-reset p-0">
                {state.todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center bg-blue-100 border-black border-dashed border-2 my-2 py-4"
                    >
                        <span
                            onDoubleClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo })}
                            className={`flex-1 ml-12 cursor-pointer ${
                                todo.complete && 'line-through text-grey-darkest'
                            }`}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}>
                            <img
                                src="https://as2.ftcdn.net/v2/jpg/01/97/22/97/1000_F_197229786_vWEFpeQEOtIcjvtKVRAyPPP91ANs43uq.jpg"
                                alt="Edit Icon"
                                className="h-6"
                            />
                        </button>
                        <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo })}>
                            <img
                                src="https://as2.ftcdn.net/v2/jpg/03/46/38/39/1000_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
                                alt="Delete Icon"
                                className="h-6"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
