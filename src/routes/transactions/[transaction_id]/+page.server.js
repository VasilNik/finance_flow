import db from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ params }) {
    const transaction = await db.getTransaction(params.transaction_id);
	const account = await db.getAccount(transaction.accountId);

	return {
		transaction,
		account
	};
}
