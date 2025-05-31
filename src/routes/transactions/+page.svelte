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
		color: #1C1F23;
	}

	.transaction-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 24px;
	}
</style>
