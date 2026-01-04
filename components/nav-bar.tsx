'use cliente'

import { Bolt, House, ListCheck, Receipt, ShoppingBag } from "lucide-react"

export default function NavBar() {
    return (
        <div className="w-full border-t-2 border-zinc-200 bg-white fixed bottom-0 p-2">
            <nav className="flex justify-between w-full p-2">
                <a className="flex items-center justify-center flex-col relative" href="/rt">
                    <House className="text-blue-600" />
                    <span className="text-xs text-blue-600">
                        Início
                    </span>
                    <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/rt">
                    <Receipt />
                    <span className="text-xs">
                        Despesas
                    </span>
                    <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/rt">
                    <ShoppingBag />
                    <span className="text-xs">
                        Compras
                    </span>
                    <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/rt">
                    <ListCheck />
                    <span className="text-xs">
                        Tarefas
                    </span>
                    <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/rt">
                    <Bolt />
                    <span className="text-xs">
                        Ajustes
                    </span>
                    <div className="w-1 h-1 rounded-full -bottom-2 absolute bg-blue-600"></div>
                </a>
            </nav>
        </div>
    )
}