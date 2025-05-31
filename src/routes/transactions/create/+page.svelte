<script>
    import { page } from '$app/stores';

    let {data} = $props();
    let accounts = data.accounts;
    
    let amount = $state();
    let type = $state("income");
    let account = $state("");
    let description = $state("");
    let date = $state("");

    $effect(() => {
		if (type === "expense" && amount > 0) {
			amount = -Math.abs(amount);
		}
		if (type === "income" && amount < 0) {
			amount = Math.abs(amount);
		}
	});
</script>

<a href="/transactions" class="btn btn-secondary mb-3">Zurück</a>

<h1>Transaktion hinzufügen</h1>

<form method="POST" action="?/createTransaction">
    <div class="mb-3">
        <label for="amount" class="form-label">Betrag (Maximal 2 Nachkommastellen)</label>

        <div class="input-wrapper">
            <span class="input-prefix">CHF</span>
            <input
                name="amount"
                type="number"
                step="0.01"
                bind:value={amount}
                required
                class="form-control-input"
            />
        </div>
    </div>

    <div class="mb-3">
        <label for="type" class="form-label">Typ</label>
        <select name="type" bind:value={type} required class="form-select">
            <option value="income">Einnahme</option>
            <option value="expense">Ausgabe</option>
        </select>
    </div>

    <div class="mb-3">
        <label for="account" class="form-label">Konto</label>
        <select name="account" bind:value={account} required class="form-select">
            <option value="" disabled selected>Konto auswählen</option>
            {#each accounts as acc}
                <option value={acc._id}>{acc.name}</option>
            {/each}
        </select>
    </div>

    <div class="mb-3">
        <label for="description" class="form-label">Beschreibung</label>
        <input name="description" bind:value={description} required class="form-control" />
    </div>

    <div class="mb-3">
        <label for="date" class="form-label">Datum</label>
        <input name="date" type="date" bind:value={date} required class="form-control" />
    </div>

    <button type="submit" name="createTransaction" class="btn btn-primary"
        >Speichern</button
    >
</form>

<style>
    .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
        background-color: white;
    }

    .input-prefix {
        padding: 10px 12px;
        background-color: #f2f2f2;
        color: #1c1f23;
        font-weight: 500;
        border-right: 1px solid #ccc;
        font-size: 1rem;
    }

    .form-control-input {
        flex: 1;
        border: none;
        padding: 10px 12px;
        outline: none;
        font-size: 1rem;
    }
</style>
