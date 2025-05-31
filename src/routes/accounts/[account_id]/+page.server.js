import db from "$lib/server/db.js"

export async function load({ params }) {
    return {
        account: await db.getAccount(params.account_id),
        transactions: await db.getTransactionsByAccount(params.account_id)
    };
}
