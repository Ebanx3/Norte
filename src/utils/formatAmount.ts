export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case "dolares":
      return "USD ";
    case "euros":
      return "€";
    default:
      return "$";
  }
};

export const formatAmount = (amount: number, currency: Currency) => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};