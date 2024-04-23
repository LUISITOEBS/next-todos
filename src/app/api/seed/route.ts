import prisma from '@/app/lib/prisma'
import { User } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data:{
            email: 'example@example.com',
            password: bcrypt.hashSync('123456'),
            name: 'example@example.com'.split('@')[0],
            roles: ['Client, Admin, Super user'],
            todos: {
                create: [
                    { description: 'Power stone', complete: true},
                    { description: 'Sould stone'},
                    { description: 'Time stone'},
                    { description: 'Space stone'},
                    { description: 'Reality stone'},
                    { description: 'Infinity stone'}
                ]
            }
        }
    })

    return NextResponse.json({
        message: 'seed executed',
    })
}