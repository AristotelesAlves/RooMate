import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Criar uma conta</CardTitle>
        <CardDescription>
          Preencha suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input id="name" type="text" placeholder="João Silva" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@dominio.com"
                required
              />
              <FieldDescription>
                Usaremos este e-mail para entrar em contato. Não compartilharemos seu e-mail com ninguém.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar senha
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Criar conta</Button>
                <Button variant="outline" type="button">
                  Cadastrar com Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <a href="#">Entrar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
