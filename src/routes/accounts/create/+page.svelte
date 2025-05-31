<script>
    let name = $state("");
    let balance = $state();
</script>

<a href="/accounts" class="btn btn-secondary mb-3">Zurück</a>

<h1>Konto hinzufügen</h1>

<form method="POST" action="?/createAccount">
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input name="name" bind:value={name} required class="form-control" />
    </div>

    <div class="mb-3">
        <label for="balance" class="form-label">Kontostand (Maximal 2 Nachkommastellen)</label>

        <div class="input-wrapper">
            <span class="input-prefix">CHF</span>
            <input
                name="balance"
                type="number"
                step="0.01"
                bind:value={balance}
                required
                class="form-control-input"
            />
        </div>
    </div>

    <button type="submit" name="createAccount" class="btn btn-primary"
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
