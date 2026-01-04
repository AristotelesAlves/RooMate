'use client'
import { Bolt, House, ListCheck, Receipt, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathname = usePathname();

    const verifyPathName = (pathName: string): boolean  => {
        return pathname.includes(pathName)
    }

    return (
        <div className="w-full border-t-2 border-zinc-200 bg-white p-2">
            <nav className="flex justify-between w-full p-2">
                <a className="flex items-center justify-center flex-col relative" href="/inicio">
                    <House className={` ${verifyPathName('inicio') ? 'text-blue-600' : null}`} />
                    <span className={`text-xs ${verifyPathName('inicio') ? 'text-blue-600' : null}`}>
                        Início 
                    </span>
                    {
                        verifyPathName('inicio') && (
                            <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                        )
                    }
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/despesas">
                    <Receipt className={` ${verifyPathName('despesas') ? 'text-blue-600' : null} `} />
                    <span className={`text-xs ${verifyPathName('despesas') ? 'text-blue-600' : null}`}>
                        Despesas
                    </span>
                    {
                        verifyPathName('despesas') && (
                            <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                        )
                    }
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/compras">
                    <ShoppingBag className={` ${verifyPathName('compras') ? 'text-blue-600' : null} `} />
                    <span className={`text-xs ${verifyPathName('compras') ? 'text-blue-600' : null}`}>
                        Compras
                    </span>
                    {
                        verifyPathName('compras') && (
                            <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                        )
                    }
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/tarefas">
                    <ListCheck className={` ${verifyPathName('tarefas') ? 'text-blue-600' : null} `} />
                    <span className={`text-xs ${verifyPathName('tarefas') ? 'text-blue-600' : null}`}>
                        Tarefas
                    </span>
                    {
                        verifyPathName('tarefas') && (
                            <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                        )
                    }
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/ajustes">
                    <Bolt className={` ${verifyPathName('ajustes') ? 'text-blue-600' : null} `} />
                    <span className={`text-xs ${verifyPathName('ajustes') ? 'text-blue-600' : null}`}>
                        Ajustes
                    </span>
                    {
                        verifyPathName('ajustes') && (
                            <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                        )
                    }
                </a>
            </nav>
        </div>
    )
}