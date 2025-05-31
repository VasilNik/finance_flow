import db from "$lib/server/db.js";
import { redirect } from '@sveltejs/kit';

export async function load() {
    let accounts = await db.getAccounts();
    return {
        accounts: accounts
    }
}

export const actions = {
    createTransaction: async ({ request }) => {
        const data = await request.formData()
        let transaction = {
            accountId: data.get("account"),
            amount: parseFloat(data.get("amount")),
            type: data.get("type"),
            description: data.get("description"),
            date: data.get("date"),
        };
        await db.createTransaction(transaction);

        throw redirect(303, '/transactions');
    },
}
