<script>
  import { formatCurrency } from '$lib/utils/format.js';
  let { account } = $props();
</script>

<a class="account-item" href={`/accounts/${account._id}`}>
  <div class="account-name">{account.name}</div>
  <div class="account-balance">CHF {formatCurrency(account.balance)}</div>
</a>

<style>
  .account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    background-color: transparent;
    text-decoration: none;
    color: #1c1f23;
    transition: background-color 0.2s ease;
  }

  .account-item:hover {
    background-color: #f2f4f6;
  }

  .account-name {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .account-balance {
    font-size: 1rem;
    font-weight: bold;
    color: #6a7b8d;
  }
</style>
