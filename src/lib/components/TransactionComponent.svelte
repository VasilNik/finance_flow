<script>
    import dayjs from "dayjs";
    import { formatCurrency } from '$lib/utils/format.js';

    let { transaction } = $props();
</script>

<a class="transaction-item" href={`/transactions/${transaction._id}`}>
    <div class="transaction-main">
        <span class="transaction-title">{transaction.description}</span>
        <span class="transaction-amount">
            {transaction.amount >= 0 ? "+" : "-"}CHF {formatCurrency(Math.abs(transaction.amount))}
        </span>
    </div>
    <div class="transaction-meta">
        <span class="transaction-date">{dayjs(transaction.date).format("DD.MM.YYYY")}</span>
        <span class="transaction-category">{transaction.category}</span>
    </div>
</a>

<style>
    .transaction-item {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        width: 100%;
        background-color: transparent;
        text-decoration: none;
        color: #1c1f23;
        transition: background-color 0.2s ease;
    }

    .transaction-item:hover {
        background-color: #f2f4f6;
    }

    .transaction-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .transaction-title {
        font-size: 1.05rem;
        font-weight: 500;
    }

    .transaction-amount {
        font-weight: bold;
        color: #6a7b8d;
    }

    .transaction-meta {
        margin-top: 4px;
        font-size: 0.85rem;
        color: #6a7b8d;
        display: flex;
        justify-content: space-between;
    }
</style>
