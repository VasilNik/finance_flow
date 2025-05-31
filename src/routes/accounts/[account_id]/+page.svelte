<script>
	let { data } = $props();
	import TransactionComponent from "$lib/components/TransactionComponent.svelte";
	import { formatCurrency } from "$lib/utils/format.js";
</script>

<div class="page-container">
	<section class="account-header">
		<div class="account-info">
			<div>
				<h1>{data.account.name}</h1>
				<p class="account-balance">
					CHF {formatCurrency(data.account.balance)}
				</p>
			</div>
			<a href="/transactions/create?accountId=${data.account._id}" class="btn btn-primary"
				>+ Neue Transaktion</a
			>
		</div>

		<div class="transaction-summary">
			{#if data.transactions.length === 0}
				<p class="info-text">Keine Transaktionen vorhanden.</p>
			{:else}
				<p class="info-text">
					{data.transactions.length} Transaktionen
				</p>
			{/if}
		</div>
	</section>

	<div class="transaction-list">
		{#each data.transactions as transaction}
			<TransactionComponent {transaction} />
		{/each}
	</div>
</div>

<style>
	.page-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 20px;
	}

	.account-header {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 24px;
		margin-bottom: 24px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.account-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.account-info h1 {
		margin: 0;
		font-size: 1.5rem;
		color: #1c1f23;
	}

	.account-balance {
		margin: 4px 0 0;
		font-size: 1.1rem;
		color: #6a7b8d;
		font-weight: 500;
	}

	.transaction-summary {
		margin-top: 8px;
	}

	.info-text {
		font-size: 0.95rem;
		color: #6a7b8d;
	}

	.transaction-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
