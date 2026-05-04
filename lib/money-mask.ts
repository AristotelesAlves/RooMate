const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatMoneyInput(value: string) {
  const digits = value.replace(/\D/g, "")

  if (!digits) {
    return ""
  }

  return moneyFormatter.format(Number(digits) / 100)
}

export function parseMoneyInput(value: string) {
  const digits = value.replace(/\D/g, "")

  if (!digits) {
    return 0
  }

  return Number(digits) / 100
}
