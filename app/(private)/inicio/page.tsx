'use client'
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Copy, Users,  CircleDollarSign, ShoppingCart, ListCheckIcon, Receipt, Zap } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner"

export default function Inicio(){

    const handleCopyCode = (): void  =>
    {
        toast.success("Copiado", {
          description: "Códigdo copiado #COD-2345",
          position: 'top-center'
        })
    }

    return (
        <div className="flex flex-col flex-1 w-full gap-4">
            <section>
                <h1 className="font-semibold text-xl">
                    Olá, Aristóteles! 
                </h1>
                <p className="text-base text-zinc-400">
                    Veja o resumo do seu apartamento
                </p>
            </section>
            <section className="flex items-center justify-between rounded-full bg-[#F1EBE4] mx-1 py-1 px-4">
                <div className="flex items-center gap-1">
                    <Users/>
                    <span>3 Moradores</span>
                </div>
                <Button onClick={() => handleCopyCode()}
                  className="active:text-blue-800 hover:bg-transparent" 
                  variant={"ghost"}
                >
                    #COD-2345
                    <Copy/>
                </Button>
            </section>
            <section className="grid grid-cols-2 gap-2">
                <Card className="p-2 col-span-2 gap-2 flex-row items-center bg-[#237B99]">
                    <div className="p-2 rounded-lg h-fit w-fit bg-white text-[#237B99]">
                        <CircleDollarSign/>
                    </div>
                    <div>
                        <CardDescription className="text-zinc-200">
                            A pagar
                        </CardDescription>
                        <span className="text-white font-semibold">
                            R$ 0,00
                        </span>
                    </div>
                </Card>
                <Card className="p-2 justify-between flex-row m-0 gap-2 items-start ">
                    <div>
                        <CardDescription>
                            Compras
                        </CardDescription>
                        <span className="font-semibold">
                            0
                        </span>
                        <CardDescription>
                            Itens na lista
                        </CardDescription>
                    </div>
                    <div className="p-2 rounded-lg h-fit w-fit">
                        <ShoppingCart/>
                    </div>
                </Card>
                <Card className="p-2 justify-between flex-row m-0 gap-2 items-start ">
                    <div>
                        <CardDescription>
                            Tarefas
                        </CardDescription>
                        <span className="font-semibold">
                            0
                        </span>
                        <CardDescription>
                            Pendentes
                        </CardDescription>
                    </div>
                    <div className="p-2 rounded-lg h-fit w-fit">
                        <ListCheckIcon/>
                    </div>
                </Card>
            </section>
            <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <span className="font-semibold">
                        Despesas Pendentes
                    </span>
                    <Link className="border-b px-1" href={'/despesas'}>Ver todas</Link>
                </div>
                <div>
                    {/* <Card className="items-center gap-2">
                        <Receipt/>
                        <span>
                            Nenhuma despesa pendente!
                        </span>
                    </Card> */}
                    <Card className="p-3 gap-2">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-1">
                                <div className="bg-[#F9B11F] text-white rounded-xl h-fit w-fit p-2">
                                    <Zap/>
                                </div>
                                <div>
                                    <h2>Conta de energia</h2>
                                    <CardDescription>Luz</CardDescription>
                                </div>
                            </div>
                            <div>
                                <div className="text-end">
                                    <h2 className="font-semibold">R$ 150,00</h2>
                                    <CardDescription>11 de jan de 2025</CardDescription>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <CardDescription>Pagamentos</CardDescription>
                                <span className="font-semibold">1/2</span>
                            </div>
                            <Progress value={50} />
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}