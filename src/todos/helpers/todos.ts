import { Todo } from "@prisma/client";

const sleep = ():Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}

export const toggleTodo = async( id: string, complete: boolean ):Promise<Todo> => {
    await sleep();
    const body = { complete };
    const todo = await fetch(`/api/todos/${ id }`, {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json() );

    return todo;
}

export const createTodo = async( description: string ):Promise<Todo> => {
    const body = { description };
    const todo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( res => res.json() );

    return todo;
}


export const deleteTodos = async():Promise<boolean> => {
    try {
        const todo = await fetch(`/api/todos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => res.json() );
    
        return true;
    } catch (error) {
        return false;
    }
}