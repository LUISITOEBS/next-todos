import { SessionProvider } from "next-auth/react";

interface Props{
    children: React.ReactNode;
}

export const AuthProvider = async({ children }: Props) => {

    return (
        <SessionProvider>
            { children }
        </SessionProvider>
    )
}
