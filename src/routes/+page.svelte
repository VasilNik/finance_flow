<script>
	import AccountComponent from "$lib/components/AccountComponent.svelte";
	import TransactionLineChart from "$lib/components/TransactionLineChart.svelte";
	import BalanceChart from "$lib/components/BalanceChart.svelte";
	import { formatCurrency } from "$lib/utils/format.js";

	let { data } = $props();

	const totalBalance = data.accounts.reduce(
		(sum, account) => sum + account.balance,
		0,
	);
</script>

<div class="page-container">
	<header class="summary-box">
		<h2 class="total-balance">Gesamtvermögen</h2>
		<p class="total-balance-value">
			CHF {formatCurrency(
				data.accounts.reduce((s, a) => s + parseFloat(a.balance), 0),
			)}
		</p>
	</header>

	<div class="content-grid">
		<div class="transaction-column">
			<h3 class="section-heading">Transaktionsverlauf</h3>
			<TransactionLineChart transactions={data.transactions} />
		</div>

		<div class="balance-column">
			<h3 class="section-heading">Vermögensverteilung</h3>
			<BalanceChart accounts={data.accounts} />
		</div>
	</div>
</div>

<style>
	.page-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 24px 16px;
	}

	.summary-box {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 24px;
		margin-bottom: 32px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		text-align: center;
		border-left: 6px solid #6a7b8d;
	}

	.total-balance {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 6px;
		color: #1c1f23;
	}

	.total-balance-value {
		font-size: 1.3rem;
		color: #6a7b8d;
		font-weight: 500;
	}

	.content-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 32px;
		align-items: flex-start;
	}

	.transaction-column {
		flex: 1 1 60%;
	}

	.balance-column {
		flex: 1 1 35%;
		min-width: 280px;
	}

	.section-heading {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 16px;
		color: #1c1f23;
	}
</style>
