<script>
	import TransactionComponent from "$lib/components/TransactionComponent.svelte";

	let { data } = $props();
</script>

<div class="page-container">
	<h1 class="page-heading">Transaktionsübersicht</h1>

	<a href="/transactions/create" class="btn btn-primary"
		>+ Neue Transaktion hinzufügen</a
	>

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
		padding: 24px 16px;
	}

	.page-heading {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 16px;
		color: #1c1f23;
	}

	.transaction-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 24px;
	}

	.btn-primary {
		background-color: #2a2e35;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		font-weight: 500;
		transition:
			background-color 0.3s ease,
			transform 0.2s ease;
	}

	.btn-primary:hover {
		background-color: #6a7b8d;
		transform: translateY(-1px);
	}

	.btn-primary:hover,
	.btn-primary:focus,
	.btn-primary:active {
		background-color: #6a7b8d;
		color: white;
		outline: none;
		box-shadow: none;
	}
</style>
