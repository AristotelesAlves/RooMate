import { Bell, CoinsIcon, House, Trash } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Link from "next/link";

export default function Header(){
    return (
        <div className="w-full flex items-center justify-between border-b-2 border-zinc-200 bg-white p-2">
            <div className="flex items-center gap-1">
                <div className="p-2 bg-[#237B99] text-zinc-100 rounded-lg text-sm shadow-2xl">
                    <House/>
                </div>
                <h1 className="font-semibold">
                    RoomMate
                </h1>
            </div>
            <div>
                <Link href={'/notificacoes'}>
                    <Bell/>
                </Link>
            </div>
        </div>
    )
}