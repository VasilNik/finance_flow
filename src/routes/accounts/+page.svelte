<script>
	import AccountComponent from '$lib/components/AccountComponent.svelte';
	let { data } = $props(); // enthält: data.accounts
</script>

<div class="page-container">
	<h1 class="page-heading">Kontenübersicht</h1>

	<a href="/accounts/create" class="btn btn-primary">
		+ Neues Konto hinzufügen
	</a>

	<div class="account-list">
		{#each data.accounts as account}
			<AccountComponent {account} />
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

	.account-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 24px;
	}
</style>
