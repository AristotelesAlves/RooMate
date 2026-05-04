'use client'

import { Droplet, Ellipsis, Flame, House, Wifi, Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DrawerClose, DrawerContent } from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner"


type expenseType = {
    title: string,
    value: number,
    category: 'luz' | 'agua' | 'internet' | 'aluguel' | 'gas' | 'outros',
    dueDate: Date,
    division: boolean
}

export default function ExpenseFormDrawer() {

    const [formDate, setFormDate] = useState<Partial<expenseType>>({
        division: true
    });

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
            name: 'Outros',
            label: 'outros',
            icon: <Ellipsis />
        },
    ]
    
    function emptyFields() {
        const requiredFields: (keyof expenseType)[] = ['title', 'value', 'category', 'dueDate'];
        const emptyFields = requiredFields.filter(filed => !formDate[filed]);
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
            default:
                return "";
        }
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
        }
        console.log(formDate);
    }

    return (
        <DrawerContent>
            <div className="h-dvh p-4 overflow-auto gap-4 flex flex-col">
                <div>
                    <label>Titulo</label>
                    <Input onChange={(e) => updateFormDate("title", e.target.value)} placeholder="Ex: Conta de luz dezembro" />
                </div>
                <div>
                    <label>Valor</label>
                    <Input type="number" onChange={(e) => updateFormDate("value", parseFloat(e.target.value))} placeholder="R$ 0,00" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {categorysMapper.map((category, key) => (
                        <Card className={`items-center justify-center p-2 gap-2 ${formDate.category === category.label ? "border-sky-500 bg-sky-50" : "border-gray-300"} border-2 cursor-pointer transition-all duration-300`}
                            onClick={() => updateFormDate("category", category.label as expenseType["category"])}>
                            {category.icon}
                            <span className="text-sm">
                                {category.name}
                            </span>
                        </Card>
                    ))}
                </div>
                <div>
                    <label>Data de vencimento</label>
                    <Input type="date" />
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