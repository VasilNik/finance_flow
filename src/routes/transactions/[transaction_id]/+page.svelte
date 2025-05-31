<script>
	import { formatCurrency } from '$lib/utils/format.js';
	import dayjs from 'dayjs';

	let { data } = $props(); // enthält: data.transaction, data.account
	const tx = data.transaction;
</script>

<div class="page-container">
	<a href="/transactions" class="btn-secondary">← Zurück zur Übersicht</a>

	<h1 class="page-title">Transaktion</h1>

	<div class="transaction-details">
		<p><strong>Beschreibung:</strong> {tx.description}</p>
		<p><strong>Typ:</strong> {tx.type === 'income' ? 'Einnahme' : 'Ausgabe'}</p>
		<p><strong>Betrag:</strong> {tx.type === 'expense' ? '-' : ''}CHF {formatCurrency(Math.abs(tx.amount))}</p>
		<p><strong>Datum:</strong> {dayjs(tx.date).format('DD.MM.YYYY')}</p>
		<!--<p><strong>Zugehöriges Konto:</strong> {data.account.name}</p>-->
	</div>
</div>

<style>
	.page-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 24px 16px;
	}

	.page-title {
		font-size: 1.6rem;
		margin: 16px 0;
		color: #1c1f23;
	}

	.transaction-details {
		background-color: #ffffff;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
		color: #1c1f23;
	}

	.transaction-details p {
		margin: 8px 0;
		font-size: 1rem;
	}

	.btn-secondary {
		display: inline-block;
		margin-bottom: 12px;
		color: #2a2e35;
		text-decoration: none;
		font-weight: 500;
	}
</style>
