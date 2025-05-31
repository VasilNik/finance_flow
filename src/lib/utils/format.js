export function formatCurrency(amount) {
	return new Intl.NumberFormat('de-CH', {
	  style: 'decimal',
	  minimumFractionDigits: 2,
	  maximumFractionDigits: 2
	}).format(amount);
  }
  