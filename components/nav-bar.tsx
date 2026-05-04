'use client'
import { Bolt, House, ListCheck, Receipt, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathname = usePathname();

    const verifyPathName = (pathName: string): boolean  => {
        return pathname.includes(pathName)
    }

    return (
        <div className="w-full fixed flex justify-center bottom-0 left-0 p-2">
            <nav className="flex gap-8 bg-white border-zinc-200 border-2 w-fit rounded-2xl px-4 py-2">
                <a className="flex items-center justify-center flex-col relative" href="/inicio">
                    <House className={` ${verifyPathName('inicio') ? 'text-[#237B99]' : null}`} />
                    <span className={`text-xs ${verifyPathName('inicio') ? 'text-[#237B99]' : null}`}>
                        Início 
                    </span>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/despesas">
                    <Receipt className={` ${verifyPathName('despesas') ? 'text-[#237B99]' : null} `} />
                    <span className={`text-xs ${verifyPathName('despesas') ? 'text-[#237B99]' : null}`}>
                        Despesas
                    </span>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/compras">
                    <ShoppingBag className={` ${verifyPathName('compras') ? 'text-[#237B99]' : null} `} />
                    <span className={`text-xs ${verifyPathName('compras') ? 'text-[#237B99]' : null}`}>
                        Compras
                    </span>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/tarefas">
                    <ListCheck className={` ${verifyPathName('tarefas') ? 'text-[#237B99]' : null} `} />
                    <span className={`text-xs ${verifyPathName('tarefas') ? 'text-[#237B99]' : null}`}>
                        Tarefas
                    </span>
                </a>
                <a className="flex items-center justify-center flex-col relative" href="/ajustes">
                    <Bolt className={` ${verifyPathName('ajustes') ? 'text-[#237B99]' : null} `} />
                    <span className={`text-xs ${verifyPathName('ajustes') ? 'text-[#237B99]' : null}`}>
                        Ajustes
                    </span>
                </a>
            </nav>
        </div>
    )
}