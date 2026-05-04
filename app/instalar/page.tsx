"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Download, Home, Share, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
}

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean
}

function isAppInstalled() {
  if (typeof window === "undefined") {
    return false
  }

  const standalone = window.matchMedia("(display-mode: standalone)").matches
  const navigator = window.navigator as NavigatorWithStandalone

  return standalone || Boolean(navigator.standalone)
}

export default function InstallPage() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(isAppInstalled)

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    function handleAppInstalled() {
      setInstallPrompt(null)
      setIsInstalled(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  async function handleInstall() {
    if (!installPrompt) {
      return
    }

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice

    if (choice.outcome === "accepted") {
      setIsInstalled(true)
    }

    setInstallPrompt(null)
  }

  return (
    <main className="min-h-svh bg-[#F7F8FA] px-4 py-6">
      <div className="mx-auto flex max-w-md flex-col gap-5">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Instalar RooMate</h1>
            <p className="text-sm text-muted-foreground">
              Acesse o app pela tela inicial do celular.
            </p>
          </div>
          <div className="rounded-xl bg-[#237B99] p-3 text-white">
            <Smartphone />
          </div>
        </section>

        <Card className="gap-4 p-4">
          <div className="flex items-center gap-3">
            <Image
              alt="RooMate"
              className="h-16 w-16 rounded-2xl"
              height={64}
              src="/icon-192.png"
              width={64}
            />
            <div>
              <h2 className="font-semibold">RooMate</h2>
              <CardDescription>Instalação rápida, sem loja de apps.</CardDescription>
            </div>
          </div>

          {isInstalled ? (
            <Button disabled>
              <CheckCircle2 />
              App instalado
            </Button>
          ) : (
            <Button disabled={!installPrompt} onClick={handleInstall}>
              <Download />
              Instalar app
            </Button>
          )}

          {!installPrompt && !isInstalled ? (
            <CardDescription>
              Se o botão estiver desativado, use as instruções abaixo no navegador.
            </CardDescription>
          ) : null}
        </Card>

        <section className="flex flex-col gap-3">
          <h2 className="font-semibold">Android ou Chrome</h2>
          <Card className="gap-3 p-4">
            <Step number="1" text="Abra esta página no Chrome." />
            <Step number="2" text="Toque em Instalar app quando o botão estiver disponível." />
            <Step number="3" text="Confirme a instalação." />
          </Card>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-semibold">iPhone ou iPad</h2>
          <Card className="gap-3 p-4">
            <Step icon={<Share size={16} />} text="Toque no botão Compartilhar do Safari." />
            <Step number="2" text="Escolha Adicionar à Tela de Início." />
            <Step number="3" text="Confirme em Adicionar." />
          </Card>
        </section>

        <Button asChild variant="outline">
          <Link href="/inicio">
            <Home />
            Voltar para o app
          </Link>
        </Button>
      </div>
    </main>
  )
}

function Step({
  icon,
  number,
  text,
}: {
  icon?: ReactNode
  number?: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#237B99] text-sm font-semibold text-white">
        {icon ?? number}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  )
}
