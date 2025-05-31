<script>
    import "./styles.css";
    let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg navbar-custom px-4">
    <a class="navbar-brand d-flex align-items-center gap-2" href="/">
        <img src="/images/Logo.png" class="navbar-logo" alt="Logo">
        FinanceFlow
    </a>

    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="/accounts">Konten</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/transactions">Transaktionen</a>
        </li>
    </ul>
</nav>
<div class="container">
    {@render children()}
</div>
