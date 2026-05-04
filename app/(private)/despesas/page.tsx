'use client'
import ExpenseFormDrawer, { CreateExpenseInput } from "@/components/drawer-form/expense-form"
import { Button } from "@/components/ui/button"
import { Card, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Drawer, DrawerTrigger } from "@/components/ui/drawer"
import { CheckCircle2, Clock3, Droplet, Ellipsis, Flame, House, Plus, Receipt, ShoppingCart, Wifi, Zap } from "lucide-react"
import { useState } from "react"

type ExpenseStatus = "pending" | "paid"

type Expense = {
  id: number
  title: string
  category: "luz" | "agua" | "internet" | "aluguel" | "gas" | "mercado" | "outros"
  amount: number
  dueDate: string
  status: ExpenseStatus
  paidBy: number
  totalResidents: number
  responsible: string
  source?: "purchase-list"
}

const mockExpenses: Expense[] = [
  {
    id: 1,
    title: "Conta de energia",
    category: "luz",
    amount: 186.4,
    dueDate: "2026-05-11",
    status: "pending",
    paidBy: 1,
    totalResidents: 3,
    responsible: "Todos",
  },
  {
    id: 2,
    title: "Internet fibra",
    category: "internet",
    amount: 119.9,
    dueDate: "2026-05-15",
    status: "pending",
    paidBy: 2,
    totalResidents: 3,
    responsible: "Todos",
  },
  {
    id: 3,
    title: "Aluguel maio",
    category: "aluguel",
    amount: 1800,
    dueDate: "2026-05-05",
    status: "paid",
    paidBy: 3,
    totalResidents: 3,
    responsible: "Todos",
  },
  {
    id: 4,
    title: "Gás cozinha",
    category: "gas",
    amount: 115,
    dueDate: "2026-05-22",
    status: "pending",
    paidBy: 0,
    totalResidents: 3,
    responsible: "Marina",
  },
  {
    id: 5,
    title: "Conta de água",
    category: "agua",
    amount: 92.75,
    dueDate: "2026-05-28",
    status: "paid",
    paidBy: 3,
    totalResidents: 3,
    responsible: "Todos",
  },
  {
    id: 6,
    title: "Compras da semana",
    category: "mercado",
    amount: 248.63,
    dueDate: "2026-05-18",
    status: "pending",
    paidBy: 1,
    totalResidents: 3,
    responsible: "Todos",
    source: "purchase-list",
  },
]

const categoryMapper = {
  luz: {
    label: "Luz",
    icon: Zap,
    className: "bg-[#F9B11F] text-white",
  },
  agua: {
    label: "Água",
    icon: Droplet,
    className: "bg-[#237B99] text-white",
  },
  internet: {
    label: "Internet",
    icon: Wifi,
    className: "bg-[#4F46E5] text-white",
  },
  aluguel: {
    label: "Aluguel",
    icon: House,
    className: "bg-[#16A34A] text-white",
  },
  gas: {
    label: "Gás",
    icon: Flame,
    className: "bg-[#EA580C] text-white",
  },
  mercado: {
    label: "Mercado",
    icon: ShoppingCart,
    className: "bg-[#0F766E] text-white",
  },
  outros: {
    label: "Outros",
    icon: Ellipsis,
    className: "bg-zinc-700 text-white",
  },
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export default function Despesas() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [filter, setFilter] = useState<"all" | ExpenseStatus>("all")

  function addExpense(expense: CreateExpenseInput) {
    const newExpense: Expense = {
      id: Date.now(),
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      dueDate: expense.dueDate,
      status: "pending",
      paidBy: 0,
      totalResidents: 3,
      responsible: expense.division ? "Todos" : "Individual",
      source: expense.purchaseListId ? "purchase-list" : undefined,
    }

    setExpenses(prev => [newExpense, ...prev])
    setDrawerOpen(false)
  }

  const pendingExpenses = expenses.filter((expense) => expense.status === "pending")
  const paidExpenses = expenses.filter((expense) => expense.status === "paid")
  const filteredExpenses = filter === "all"
    ? expenses
    : expenses.filter((expense) => expense.status === filter)

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const pendingAmount = pendingExpenses.reduce((total, expense) => total + expense.amount, 0)

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <div className="flex flex-col flex-1 w-full gap-4">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl">
              Despesas
            </h1>
            <p className="text-base text-zinc-400">
              Total do mês {currencyFormatter.format(totalAmount)}
            </p>
          </div>
          <DrawerTrigger className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
            <Plus />
          </DrawerTrigger>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <Card className="p-3 gap-2 bg-[#237B99] text-white">
            <CardDescription className="text-zinc-100">
              Em aberto
            </CardDescription>
            <strong className="text-xl">
              {currencyFormatter.format(pendingAmount)}
            </strong>
            <span className="text-sm text-zinc-100">
              {pendingExpenses.length} despesas pendentes
            </span>
          </Card>

          <Card className="p-3 gap-2">
            <CardDescription>
              Pagas
            </CardDescription>
            <strong className="text-xl">
              {paidExpenses.length}
            </strong>
            <span className="text-sm text-muted-foreground">
              de {expenses.length} lançamentos
            </span>
          </Card>
        </section>

        <section>
          <Card className="flex-row gap-2 py-2 justify-center items-center">
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "ghost"}
            >
              Todas ({expenses.length})
            </Button>
            <Button
              onClick={() => setFilter("pending")}
              variant={filter === "pending" ? "default" : "ghost"}
            >
              Pendentes ({pendingExpenses.length})
            </Button>
            <Button
              onClick={() => setFilter("paid")}
              variant={filter === "paid" ? "default" : "ghost"}
            >
              Pagas ({paidExpenses.length})
            </Button>
          </Card>
        </section>

        <section>
          {filteredExpenses.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center gap-3 mt-4">
              <Receipt size={40} />
              <strong>
                Nenhuma despesa encontrada
              </strong>
              <span>
                Ajuste o filtro ou cadastre uma despesa
              </span>
              <DrawerTrigger className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
                <Plus /> Adicionar despesa
              </DrawerTrigger>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredExpenses.map((expense) => {
                const category = categoryMapper[expense.category]
                const CategoryIcon = category.icon
                const progress = (expense.paidBy / expense.totalResidents) * 100
                const isPaid = expense.status === "paid"

                return (
                  <Card key={expense.id} className="p-3 gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-2">
                        <div className={`p-2 rounded-xl h-fit w-fit shrink-0 ${category.className}`}>
                          <CategoryIcon />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-medium truncate">
                            {expense.title}
                          </h2>
                          <CardDescription>
                            {category.label} • {expense.responsible}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="text-end shrink-0">
                        <h2 className="font-semibold">
                          {currencyFormatter.format(expense.amount)}
                        </h2>
                        <CardDescription>
                          {dateFormatter.format(new Date(`${expense.dueDate}T00:00:00`))}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${isPaid ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {isPaid ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}
                        {isPaid ? "Paga" : "Pendente"}
                      </span>
                      <span className="text-sm font-medium">
                        {expense.paidBy}/{expense.totalResidents} pagamentos
                      </span>
                    </div>

                    <Progress value={progress} />
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        <ExpenseFormDrawer
          key={drawerOpen ? "open" : "closed"}
          onAddExpense={addExpense}
        />
      </div>
    </Drawer>
  )
}
