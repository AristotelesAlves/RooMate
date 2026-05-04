'use client'
import ExpenseFormDrawer from "@/components/drawer-form/expense-form"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Droplet, Ellipsis, Flame, House, Plus, Receipt, Wifi, Zap } from "lucide-react"
import { useState } from "react"

export default function Ajuste() {

  const [contas, setContas] = useState();
  
  return (
    <Drawer>
      <div className="flex flex-col flex-1 w-full gap-4">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl">
              Despesas
            </h1>
            <p className="text-base text-zinc-400">
              Valor total R$ 0,00
            </p>
          </div>
          <DrawerTrigger className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
            <Plus />
          </DrawerTrigger>
        </section>
        <section>
          <Card className="flex-row gap-2 py-2 justify-center items-center">
            <Button>
              Todas (0)
            </Button>
            <Button variant={"ghost"}>
              Pendentes (0)
            </Button>
            <Button variant={"ghost"}>
              Pagas (0)
            </Button>
          </Card>
        </section>
        <section>
          <div className="w-full h-full flex flex-col items-center gap-3 mt-4">
            <Receipt size={40} />
            <strong>
              Nenhuma despesa cadastrada
            </strong>
            <span>
              Adicione sua primeira despesa
            </span>
            <DrawerTrigger className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
              <Plus /> Adicionar despesa
            </DrawerTrigger>
          </div>
        </section>
        <ExpenseFormDrawer/>
      </div>
    </Drawer>
  )
}
