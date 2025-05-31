import db from "$lib/server/db.js"

export async function load() {
    return {
        accounts: await db.getAccounts(),
        transactions: await db.getTransactions()
    }
}