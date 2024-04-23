import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Props{
    params: {
        id: string;
    }
}

const getTodo = async( id: string ):Promise<Todo | null> => {
    return await prisma.todo.findFirst({ where: { id } });
}

export async function GET(request: Request, args: Props) {
    const { id } = args.params;
    const todo = await getTodo( id );
    if( !todo ){
        return NextResponse.json({ message: `No se ha encontrado el todo con el id ${ id }` }, { status: 404 })
    }
    return NextResponse.json({
        todo
    })
}


const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})


export async function PUT(request: Request, args: Props) {

    try {
        const { id } = args.params;
        const { complete, description } = await putSchema.validate( await request.json() );
        const todo = await getTodo( id );
        if( !todo ){
            return NextResponse.json({ message: `No se ha encontrado el todo con el id ${ id }` }, { status: 404 })
        }
        const updatedTodo =  await prisma.todo.update({ 
            data: { complete, description }, 
            where: { id } 
        });
        return NextResponse.json({
            todo,
            updatedTodo
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}