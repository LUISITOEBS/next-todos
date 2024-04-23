import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const limit =  Number(searchParams.get('limit') ?? '10');
    const offset = Number(searchParams.get('offset') ?? '0');

    if( isNaN( limit ) ) {
        return NextResponse.json({ message: 'Limit debe ser un número' }, { status: 400 })
    }

    if( isNaN( offset ) ) {
        return NextResponse.json({ message: 'Offset debe ser un número' }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        skip: offset,
        take: limit
    });

    return NextResponse.json({
        count: todos.length,
        todos
    });
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
    try {
        const { complete, description } =  await postSchema.validate( await request.json() );

        const todo = await prisma.todo.create({ data: { complete, description } })
    
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } });
        return NextResponse.json({
            message: 'All deleted'
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}