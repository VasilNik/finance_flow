import db from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load({ params }) {
    return {
        transaction: await db.getTransaction(params.transaction_id)
    };
}
