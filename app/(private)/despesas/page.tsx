'use client'
import ExpenseFormDrawer, { CreateExpenseInput } from "@/components/drawer-form/expense-form"
import { Button } from "@/components/ui/button"
import { Card, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { CheckCircle2, Clock3, Droplet, Ellipsis, Flame, House, Pencil, Plus, Receipt, ShoppingCart, UserRound, Wifi, Zap } from "lucide-react"
import { useState } from "react"

type ExpenseStatus = "pending" | "paid"
type ExpenseCategory = "luz" | "agua" | "internet" | "aluguel" | "gas" | "mercado" | "outros"
type DrawerMode = "add" | "detail"

type ExpenseMovement = {
  id: number
  user: string
  date: string
  description: string
  changes?: string[]
}

type Expense = {
  id: number
  title: string
  category: ExpenseCategory
  amount: number
  dueDate: string
  status: ExpenseStatus
  paidBy: number
  totalResidents: number
  responsible: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
  movements: ExpenseMovement[]
  source?: "purchase-list"
}

type ExpenseUpdateInput = {
  title: string
  amount: number
  dueDate: string
  status: ExpenseStatus
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
    createdBy: "Aristóteles",
    createdAt: "2026-05-01T09:20:00",
    updatedBy: "Marina",
    updatedAt: "2026-05-02T18:10:00",
    movements: [
      {
        id: 101,
        user: "Aristóteles",
        date: "2026-05-01T09:20:00",
        description: "Criou a despesa",
      },
      {
        id: 102,
        user: "Marina",
        date: "2026-05-02T18:10:00",
        description: "Atualizou a despesa",
        changes: ["Valor alterado para R$ 186,40"],
      },
    ],
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
    createdBy: "Marina",
    createdAt: "2026-05-03T12:00:00",
    movements: [
      {
        id: 201,
        user: "Marina",
        date: "2026-05-03T12:00:00",
        description: "Criou a despesa",
      },
      {
        id: 202,
        user: "João",
        date: "2026-05-04T08:45:00",
        description: "Registrou pagamento",
        changes: ["Pagamentos alterado para 2/3"],
      },
    ],
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
    createdBy: "Aristóteles",
    createdAt: "2026-05-01T08:30:00",
    updatedBy: "Aristóteles",
    updatedAt: "2026-05-05T10:15:00",
    movements: [
      {
        id: 301,
        user: "Aristóteles",
        date: "2026-05-01T08:30:00",
        description: "Criou a despesa",
      },
      {
        id: 302,
        user: "Aristóteles",
        date: "2026-05-05T10:15:00",
        description: "Atualizou a despesa",
        changes: ["Status alterado para Paga"],
      },
    ],
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
    createdBy: "Marina",
    createdAt: "2026-05-04T14:05:00",
    movements: [
      {
        id: 401,
        user: "Marina",
        date: "2026-05-04T14:05:00",
        description: "Criou a despesa",
      },
    ],
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
    createdBy: "João",
    createdAt: "2026-05-02T11:40:00",
    movements: [
      {
        id: 501,
        user: "João",
        date: "2026-05-02T11:40:00",
        description: "Criou a despesa",
      },
    ],
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
    createdBy: "Aristóteles",
    createdAt: "2026-05-04T16:20:00",
    movements: [
      {
        id: 601,
        user: "Aristóteles",
        date: "2026-05-04T16:20:00",
        description: "Criou a despesa a partir de uma lista de compras",
      },
    ],
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

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`))
}

function formatDateTime(date: string) {
  return dateTimeFormatter.format(new Date(date))
}

function getStatusLabel(status: ExpenseStatus) {
  return status === "paid" ? "Paga" : "Pendente"
}

function getExpenseChanges(expense: Expense, updates: ExpenseUpdateInput) {
  const changes: string[] = []

  if (expense.title !== updates.title) {
    changes.push(`Titulo alterado de "${expense.title}" para "${updates.title}"`)
  }

  if (expense.amount !== updates.amount) {
    changes.push(`Valor alterado de ${currencyFormatter.format(expense.amount)} para ${currencyFormatter.format(updates.amount)}`)
  }

  if (expense.dueDate !== updates.dueDate) {
    changes.push(`Vencimento alterado de ${formatDate(expense.dueDate)} para ${formatDate(updates.dueDate)}`)
  }

  if (expense.status !== updates.status) {
    changes.push(`Status alterado de ${getStatusLabel(expense.status)} para ${getStatusLabel(updates.status)}`)
  }

  return changes
}

type ExpenseDetailDrawerProps = {
  expense: Expense
  onPayExpense: (expenseId: number) => void
  onUpdateExpense: (expenseId: number, updates: ExpenseUpdateInput) => void
}

function ExpenseDetailDrawer({ expense, onPayExpense, onUpdateExpense }: ExpenseDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<ExpenseUpdateInput>({
    title: expense.title,
    amount: expense.amount,
    dueDate: expense.dueDate,
    status: expense.status,
  })

  const category = categoryMapper[expense.category]
  const CategoryIcon = category.icon
  const lastUpdate = expense.updatedBy && expense.updatedAt
    ? `${expense.updatedBy} em ${formatDateTime(expense.updatedAt)}`
    : "Ainda não editada"
  const canPay = expense.status !== "paid" && expense.paidBy < expense.totalResidents

  function handleSave() {
    onUpdateExpense(expense.id, editData)
    setIsEditing(false)
  }

  return (
    <DrawerContent>
      <DrawerTitle className="sr-only">Detalhes da despesa</DrawerTitle>
      <DrawerDescription className="sr-only">
        Veja movimentações, criação e edição da despesa.
      </DrawerDescription>

      <div className="h-dvh overflow-auto p-4">
        <div className="flex flex-col gap-4 pb-4">
          <section className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <div className={`h-fit w-fit shrink-0 rounded-xl p-2 ${category.className}`}>
                <CategoryIcon />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold">
                  {expense.title}
                </h2>
                <CardDescription>
                  {category.label} • {expense.responsible}
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              size={isEditing ? "sm" : "icon"}
              variant="outline"
            >
              {isEditing ? "Editando" : <Pencil size={18} />}
            </Button>
          </section>

          {isEditing ? (
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Titulo</label>
                <Input
                  onChange={(event) => setEditData(prev => ({ ...prev, title: event.target.value }))}
                  value={editData.title}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Valor</label>
                <Input
                  min="0"
                  onChange={(event) => setEditData(prev => ({ ...prev, amount: Number(event.target.value) }))}
                  step="0.01"
                  type="number"
                  value={editData.amount}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Data de vencimento</label>
                <Input
                  onChange={(event) => setEditData(prev => ({ ...prev, dueDate: event.target.value }))}
                  type="date"
                  value={editData.dueDate}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                  onChange={(event) => setEditData(prev => ({ ...prev, status: event.target.value as ExpenseStatus }))}
                  value={editData.status}
                >
                  <option value="pending">Pendente</option>
                  <option value="paid">Paga</option>
                </select>
              </div>
            </section>
          ) : (
            <>
              <section className="grid grid-cols-2 gap-2">
                <Card className="p-3 gap-1">
                  <CardDescription>Valor</CardDescription>
                  <strong>{currencyFormatter.format(expense.amount)}</strong>
                </Card>
                <Card className="p-3 gap-1">
                  <CardDescription>Status</CardDescription>
                  <strong>{getStatusLabel(expense.status)}</strong>
                </Card>
                <Card className="p-3 gap-1">
                  <CardDescription>Vencimento</CardDescription>
                  <strong>{formatDate(expense.dueDate)}</strong>
                </Card>
                <Card className="p-3 gap-1">
                  <CardDescription>Pagamentos</CardDescription>
                  <strong>{expense.paidBy}/{expense.totalResidents}</strong>
                </Card>
              </section>

              <section className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  disabled={!canPay}
                  onClick={() => onPayExpense(expense.id)}
                >
                  {canPay ? "Registrar meu pagamento" : "Despesa paga"}
                </Button>
                <CardDescription>
                  Use quando você pagar sua parte. Ao completar todos os pagamentos, a despesa muda para paga.
                </CardDescription>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold">Auditoria</h3>
                <Card className="p-3 gap-3">
                  <div className="flex items-start gap-2">
                    <UserRound size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Criada por {expense.createdBy}</p>
                      <CardDescription>{formatDateTime(expense.createdAt)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Pencil size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Ultima atualização</p>
                      <CardDescription>{lastUpdate}</CardDescription>
                    </div>
                  </div>
                </Card>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold">Movimentações</h3>
                <div className="flex flex-col gap-2">
                  {expense.movements.map((movement) => (
                    <Card key={movement.id} className="p-3 gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{movement.description}</p>
                          <CardDescription>{movement.user}</CardDescription>
                        </div>
                        <CardDescription className="shrink-0 text-right">
                          {formatDateTime(movement.date)}
                        </CardDescription>
                      </div>
                      {movement.changes ? (
                        <div className="flex flex-col gap-1">
                          {movement.changes.map((change) => (
                            <span key={change} className="text-sm text-muted-foreground">
                              {change}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div className="w-full flex gap-2 p-2">
        {isEditing ? (
          <>
            <Button
              className="flex-1"
              onClick={() => {
                setEditData({
                  title: expense.title,
                  amount: expense.amount,
                  dueDate: expense.dueDate,
                  status: expense.status,
                })
                setIsEditing(false)
              }}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Salvar alterações
            </Button>
          </>
        ) : (
          <DrawerClose className="w-full">
            <Button className="w-full" variant="outline">
              Fechar
            </Button>
          </DrawerClose>
        )}
      </div>
    </DrawerContent>
  )
}

export default function Despesas() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("add")
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [filter, setFilter] = useState<"all" | ExpenseStatus>("all")

  const selectedExpense = expenses.find((expense) => expense.id === selectedExpenseId)

  function handleDrawerOpenChange(open: boolean) {
    setDrawerOpen(open)

    if (!open) {
      setSelectedExpenseId(null)
      setDrawerMode("add")
    }
  }

  function openAddDrawer() {
    setDrawerMode("add")
    setSelectedExpenseId(null)
    setDrawerOpen(true)
  }

  function openExpenseDetail(expenseId: number) {
    setDrawerMode("detail")
    setSelectedExpenseId(expenseId)
    setDrawerOpen(true)
  }

  function addExpense(expense: CreateExpenseInput) {
    const now = new Date().toISOString()
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
      createdBy: "Aristóteles",
      createdAt: now,
      movements: [
        {
          id: Date.now(),
          user: "Aristóteles",
          date: now,
          description: "Criou a despesa",
        },
      ],
      source: expense.purchaseListId ? "purchase-list" : undefined,
    }

    setExpenses(prev => [newExpense, ...prev])
    setDrawerOpen(false)
  }

  function updateExpense(expenseId: number, updates: ExpenseUpdateInput) {
    const now = new Date().toISOString()

    setExpenses(prev => prev.map((expense) => {
      if (expense.id !== expenseId) {
        return expense
      }

      const changes = getExpenseChanges(expense, updates)

      if (changes.length === 0) {
        return expense
      }

      return {
        ...expense,
        ...updates,
        updatedBy: "Aristóteles",
        updatedAt: now,
        movements: [
          {
            id: Date.now(),
            user: "Aristóteles",
            date: now,
            description: "Atualizou a despesa",
            changes,
          },
          ...expense.movements,
        ],
      }
    }))
  }

  function payExpense(expenseId: number) {
    const now = new Date().toISOString()

    setExpenses(prev => prev.map((expense) => {
      if (expense.id !== expenseId || expense.status === "paid") {
        return expense
      }

      const paidBy = Math.min(expense.paidBy + 1, expense.totalResidents)
      const status: ExpenseStatus = paidBy === expense.totalResidents ? "paid" : "pending"
      const changes = [
        `Pagamento registrado por Aristóteles`,
        `Pagamentos alterado para ${paidBy}/${expense.totalResidents}`,
      ]

      if (status !== expense.status) {
        changes.push("Status alterado para Paga")
      }

      return {
        ...expense,
        paidBy,
        status,
        updatedBy: "Aristóteles",
        updatedAt: now,
        movements: [
          {
            id: Date.now(),
            user: "Aristóteles",
            date: now,
            description: "Registrou pagamento",
            changes,
          },
          ...expense.movements,
        ],
      }
    }))
  }

  const pendingExpenses = expenses.filter((expense) => expense.status === "pending")
  const paidExpenses = expenses.filter((expense) => expense.status === "paid")
  const filteredExpenses = filter === "all"
    ? expenses
    : expenses.filter((expense) => expense.status === filter)

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const pendingAmount = pendingExpenses.reduce((total, expense) => total + expense.amount, 0)

  return (
    <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
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
          <DrawerTrigger onClick={openAddDrawer} className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
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
              <DrawerTrigger onClick={openAddDrawer} className="flex items-center gap-1 p-2 rounded-lg bg-[#237B99] text-white">
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
                  <Card
                    key={expense.id}
                    className="p-3 gap-3 cursor-pointer transition hover:border-[#237B99]"
                    onClick={() => openExpenseDetail(expense.id)}
                  >
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

        {drawerMode === "add" ? (
          <ExpenseFormDrawer
            key={drawerOpen ? "open" : "closed"}
            onAddExpense={addExpense}
          />
        ) : selectedExpense ? (
          <ExpenseDetailDrawer
            expense={selectedExpense}
            onPayExpense={payExpense}
            onUpdateExpense={updateExpense}
          />
        ) : null}
      </div>
    </Drawer>
  )
}
