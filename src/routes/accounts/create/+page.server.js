import db from "$lib/server/db.js";
import { redirect } from '@sveltejs/kit';

export const actions = {
    createAccount: async ({ request }) => {
        const data = await request.formData()
        let account = {
            name: data.get("name"),
            balance: parseFloat(data.get("balance")),
            createdAt: new Date().toISOString().split('T')[0] + 'T00:00:00',
        };
        await db.createAccount(account);

		throw redirect(303, '/accounts');
    },
}
