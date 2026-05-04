"use client"

import { formatMoneyInput, parseMoneyInput } from "@/lib/money-mask";
import { Droplet, Ellipsis, Flame, House, ShoppingCart, Wifi, Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner"


type expenseType = {
    title: string,
    value: number,
    category: 'luz' | 'agua' | 'internet' | 'aluguel' | 'gas' | 'mercado' | 'outros',
    purchaseListId: string,
    dueDate: Date,
    division: boolean
}

export type CreateExpenseInput = {
    title: string,
    amount: number,
    category: expenseType["category"],
    dueDate: string,
    division: boolean,
    purchaseListId?: string
}

type ExpenseFormDrawerProps = {
    onAddExpense: (expense: CreateExpenseInput) => void
}

export default function ExpenseFormDrawer({ onAddExpense }: ExpenseFormDrawerProps) {

    const [formDate, setFormDate] = useState<Partial<expenseType>>({
        division: true
    });
    const [moneyValue, setMoneyValue] = useState("");

    const openPurchaseLists = [
        {
            id: "compras-semana",
            name: "Compras da semana"
        },
        {
            id: "hortifruti",
            name: "Hortifruti"
        },
        {
            id: "limpeza",
            name: "Produtos de limpeza"
        },
    ];

    function updateFormDate<K extends keyof expenseType>(
        key: K,
        value: expenseType[K]
    ) {
        setFormDate(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const categorysMapper = [
        {
            id: 1,
            name: 'Luz',
            label: 'luz',
            icon: <Zap />
        },
        {
            id: 2,
            name: 'Água',
            label: 'agua',
            icon: <Droplet />
        },
        {
            id: 3,
            name: 'Internet',
            label: 'internet',
            icon: <Wifi />
        },
        {
            id: 4,
            name: 'Aluguel',
            label: 'aluguel',
            icon: <House />
        },
        {
            id: 5,
            name: 'Gás',
            label: 'gas',
            icon: <Flame />
        },
        {
            id: 6,
            name: 'Mercado',
            label: 'mercado',
            icon: <ShoppingCart />
        },
        {
            id: 7,
            name: 'Outros',
            label: 'outros',
            icon: <Ellipsis />
        },
    ]
    
    function emptyFields() {
        const requiredFields: (keyof expenseType)[] = ['title', 'value', 'category', 'dueDate'];
        const emptyFields = requiredFields.filter(filed => !formDate[filed]);

        if (formDate.category === "mercado" && !formDate.purchaseListId) {
            emptyFields.push("purchaseListId");
        }

        return emptyFields;
    }

    function mapperError(field: keyof expenseType) {
        switch (field) {
            case 'title':
                return "O título é obrigatório.";
            case 'value':
                return "O valor é obrigatório.";
            case 'category':
                return "A categoria é obrigatória.";
            case 'dueDate':
                return "A data de vencimento é obrigatória.";
            case 'purchaseListId':
                return "A lista de compras é obrigatória.";
            default:
                return "";
        }
    }

    function handleMoneyChange(value: string) {
        const formattedValue = formatMoneyInput(value);

        setMoneyValue(formattedValue);
        updateFormDate("value", parseMoneyInput(formattedValue));
    }

    function handleCategoryChange(category: expenseType["category"]) {
        setFormDate(prev => ({
            ...prev,
            category,
            purchaseListId: category === "mercado" ? prev.purchaseListId : undefined
        }));
    }

    function handleSubmit() {
        const verifyEmptyFields: (keyof expenseType)[] = emptyFields();
        if(verifyEmptyFields.length > 0) {
            verifyEmptyFields.forEach(fild => {
                const errorMessage = mapperError(fild);
                toast.error(errorMessage, {
                    position: 'top-center',
                    closeButton: true,
                    icon: '⚠️',
                    style: {
                        background: '#ef4444',
                        color: '#ffff',
                        border: '1px solid #ef4444',
                    }
                });
            });
            return;
        }

        onAddExpense({
            title: formDate.title as string,
            amount: formDate.value as number,
            category: formDate.category as expenseType["category"],
            dueDate: (formDate.dueDate as Date).toISOString().split("T")[0],
            division: formDate.division ?? true,
            purchaseListId: formDate.purchaseListId,
        });
    }

    return (
        <DrawerContent>
            <DrawerTitle className="sr-only">Adicionar despesa</DrawerTitle>
            <DrawerDescription className="sr-only">
                Preencha os dados para cadastrar uma nova despesa.
            </DrawerDescription>
            <div className="h-dvh p-4 overflow-auto gap-4 flex flex-col">
                <div>
                    <label>Titulo</label>
                    <Input onChange={(e) => updateFormDate("title", e.target.value)} placeholder="Ex: Conta de luz dezembro" />
                </div>
                <div>
                    <label>Valor</label>
                    <Input
                        inputMode="numeric"
                        onChange={(e) => handleMoneyChange(e.target.value)}
                        placeholder="R$ 0,00"
                        value={moneyValue}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {categorysMapper.map((category) => (
                        <Card className={`items-center justify-center p-2 gap-2 ${formDate.category === category.label ? "border-sky-500 bg-sky-50" : "border-gray-300"} border-2 cursor-pointer transition-all duration-300`}
                            key={category.id}
                            onClick={() => handleCategoryChange(category.label as expenseType["category"])}>
                            {category.icon}
                            <span className="text-sm">
                                {category.name}
                            </span>
                        </Card>
                    ))}
                </div>
                {formDate.category === "mercado" ? (
                    <div>
                        <label>Lista de compras</label>
                        <select
                            className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                            onChange={(e) => updateFormDate("purchaseListId", e.target.value)}
                            value={formDate.purchaseListId ?? ""}
                        >
                            <option value="" disabled>
                                Selecione uma lista de compras em aberto
                            </option>
                            {openPurchaseLists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}
                <div>
                    <label>Data de vencimento</label>
                    <Input type="date" onChange={(e) => updateFormDate("dueDate", new Date(e.target.value))} />
                </div>
                <div className="flex flex-col gap-3">
                    <label>Como dividir?</label>

                    <Card
                        className={`flex-row p-3 gap-3 items-center cursor-pointer border transition
                            ${formDate.division === true
                                ? "border-sky-500 bg-sky-50"
                                : "border-gray-300"
                            }
                        `}
                        onClick={() => updateFormDate("division", true)}
                    >
                        <Input
                            type="radio"
                            checked={formDate.division === true}
                            readOnly
                            className="w-4 h-4"
                        />
                        <div>
                            <CardTitle>Dividir igualmente</CardTitle>
                            <CardDescription>Cada morador paga sua parte</CardDescription>
                        </div>
                    </Card>
                    <Card
                        className={`flex-row p-3 gap-3 items-center cursor-pointer border transition
                            ${formDate.division === false
                                ? "border-sky-500 bg-sky-50"
                                : "border-gray-300"
                            }
                        `}
                        onClick={() => updateFormDate("division", false)}
                    >
                        <Input
                            type="radio"
                            checked={formDate.division === false}
                            readOnly
                            className="w-4 h-4"
                        />
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
                <Button onClick={handleSubmit} className="flex-1">
                    Salvar
                </Button>
            </div>
        </DrawerContent>
    )
}
