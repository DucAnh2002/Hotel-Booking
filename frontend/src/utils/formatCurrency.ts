const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})

export const formatCurrency = (price: number): string => {
  return currencyFormatter.format(price)
}
