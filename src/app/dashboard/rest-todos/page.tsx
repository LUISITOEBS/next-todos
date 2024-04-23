export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/app/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Listado de tareas por hacer',
  description: 'SEO Title',
};

export default async function RestTodosPage() {

  const user = await getUserSessionServer();

  if( !user ) {
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({ where: { user_id: user.id } ,orderBy: { description: 'asc' } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}