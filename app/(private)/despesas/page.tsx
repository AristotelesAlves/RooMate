import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Droplet, Ellipsis, Flame, House, Plus, Receipt, Wifi, Zap } from "lucide-react"

export default function Ajuste() {
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
        <DrawerContent>
          <div className="h-dvh p-4 overflow-auto gap-4 flex flex-col">
            <div>
              <label>Titulo</label>
              <Input placeholder="Ex: Conta de luz dezembro" />
            </div>
            <div>
              <label>Valor</label>
              <Input type="number" placeholder="R$ 0,00" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Card className="items-center justify-center p-2 gap-2"><Zap /><span className="text-sm">Luz</span></Card>
              <Card className="items-center justify-center p-2 gap-2"><Droplet /><span className="text-sm">Água</span></Card>
              <Card className="items-center justify-center p-2 gap-2"><Wifi /><span className="text-sm">Internet</span></Card>
              <Card className="items-center justify-center p-2 gap-2"><House /><span className="text-sm">Aluguel</span></Card>
              <Card className="items-center justify-center p-2 gap-2"><Flame /><span className="text-sm">Gás</span></Card>
              <Card className="items-center justify-center p-2 gap-2"><Ellipsis /><span className="text-sm">Outros</span></Card>
            </div>
            <div>
              <label>Data de vencimento</label>
              <Input type="date" />
            </div>
            <div className="flex flex-col gap-3">
              <label>Como dividir?</label>
              <Card className="flex-row p-3 gap-3">
                <Input className="p-0 m-0 w-2" type="radio" />
                <div>
                  <CardTitle>Dividir igualmente</CardTitle>
                  <CardDescription>Cada morador paga sua parte</CardDescription>
                </div>
              </Card>
              <Card className="flex-row p-3 gap-3">
                <Input className="p-0 m-0 w-2" type="radio" />
                <div>
                  <CardTitle>Uma pessoa paga</CardTitle>
                  <CardDescription>Conta de responsabilidade individual</CardDescription>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-full flex p-2 gap-2">
            <DrawerClose className="flex-1">
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>

            <Button className="flex-1">
              Salvar
            </Button>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  )
}
