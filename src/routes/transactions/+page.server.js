import db from "$lib/server/db.js"

export async function load() {
    return {
        transactions: await db.getTransactions()
    }
}