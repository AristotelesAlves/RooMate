import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default function Ajuste() {
  return (
    <div className="flex items-center justify-center">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Construction />
            Em construção
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
                Esta página ainda está sendo desenvolvida.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
