export function formatCurrency(value) {
  let numberValue = parseFloat(value);
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
