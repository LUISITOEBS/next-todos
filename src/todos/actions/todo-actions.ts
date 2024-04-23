'use server';

import prisma from "@/app/lib/prisma";
import { Todo, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { NextResponse } from "next/server";
import { getUserSessionServer } from "@/auth/actions/auth-actions";


export const sleep = async(time: number):Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time * 1000);
    })
}

export const toggleTodo = async( id: string, complete: boolean ):Promise<Todo|false> => {
    const user = await getUserSessionServer();
    if( !user ){
        return false
    }
    try {
        const todo = await prisma.todo.findFirst({ where: { id } });
        if( !todo ) throw `Todo con id ${ id } no encontrado`;
        
        const updateTodo = await prisma.todo.update({
            data: { complete },
            where: { id, user_id: user.id }
        })
    
        revalidatePath('/dashboard/server-todos');
        return updateTodo;
    } catch (error) {
        return false
    }

}

export const createTodo = async( description: string ): Promise<Todo|{message:string}> => {
    const user = await getUserSessionServer();
    if( !user ){
        return {
            message: 'Error creando todo'
        }
    }

    try {
        const todo = await prisma.todo.create({ data: { description, user_id: user.id! } });
        revalidatePath('/dashboard/server-todos');
        return todo
    } catch (error) {
        return {
            message: 'Error creando todo'
        }
    }
}

export const deleteTodo = async(): Promise<boolean> => {
    const user = await getUserSessionServer();
    if( !user ){
        return false
    }

    try {
        await prisma.todo.deleteMany({
            where: { complete: true, user_id: user.id }
        })
        revalidatePath('/dashboard/server-todos');
        return true;
    } catch (error) {
        return false;
    }
}