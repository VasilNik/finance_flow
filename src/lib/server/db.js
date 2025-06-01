import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
import { get } from "svelte/store";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("FinanceFlow");

//////////////////////////////////////////
// Accounts
//////////////////////////////////////////

async function getAccounts() {
  let accounts = [];
  try {
    const collection = db.collection("accounts");
    const query = {};

    accounts = await collection.find(query).toArray();
    accounts.forEach((account) => {
      account._id = account._id.toString();
    });
  } catch (error) {
    console.error("Fehler beim laden der Accounts: ", error.message);
  }
  return accounts;
}

async function getAccount(id) {
  let account = null;
  try {
    const collection = db.collection("accounts");
    const query = { _id: new ObjectId(id) };
    account = await collection.findOne(query);

    if (!account) {
      console.error("Es exisiert kein Account mit der ID: ", id);
    } else {
      account._id = account._id.toString();
    }
  } catch (error) {
    console.error("Fehler beim Laden des Accounts mit der ID: ", id, error.message);
  }
  return account;
}

async function createAccount(account) {
  try {
    const collection = db.collection("accounts");
    const result = await collection.insertOne(account);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Fehler beim Erstellen des Accounts: ", account, error.message);
  }
  return null;
}

async function updateAccount(accountId, amount) {
  try {
    const account = await getAccount(accountId);

    if (!account) {
      console.error("Es exisiert kein Account mit der ID: ", id);
      return;
    }

    const id = account._id;
    account.balance += amount;
    delete account._id;

    const collection = db.collection("accounts");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: account });

    if (result.matchedCount === 0) {
      console.error("Es exisiert kein Account mit der ID: " + id);
    } else {
      console.error("Account mit der ID " + id + " wurde aktualisiert.");
      return id;
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontos: ", error.message);
  }
}

//////////////////////////////////////////
// Transactions
//////////////////////////////////////////

async function getTransactions() {
  let transactions = [];
  try {
    const collection = db.collection("transactions");
    const query = {};

    transactions = (await collection.find(query).sort({ date: -1 }).toArray());
    transactions.forEach((transaction) => {
      transaction._id = transaction._id.toString();
      transaction.accountId = transaction.accountId.toString();
    });
  } catch (error) {
    console.error("Fehler beim Laden der Transaktionen: ", error.message);
  }
  return transactions;
}

async function getTransactionsByAccount(id) {
  let transactions = [];
  try {
    const collection = db.collection("transactions");
    const query = { accountId: new ObjectId(id) };

    transactions = (await collection.find(query).sort({ date: -1 }).toArray());
    transactions.forEach((transaction) => {
      transaction._id = transaction._id.toString();
      transaction.accountId = transaction.accountId.toString();
    });
  } catch (error) {
    console.error("Fehler beim Laden der Transaktion mit der Account ID: ", id, error.message);
  }
  return transactions;
}

async function getTransaction(id) {
  let transaction = null;
  try {
    const collection = db.collection("transactions");
    const query = { _id: new ObjectId(id) };
    transaction = await collection.findOne(query);
    transaction.accountId = transaction.accountId.toString();

    if (!transaction) {
      console.error("Es exisitiert keine Transaktion mit der ID: ", id);
    } else {
      transaction._id = transaction._id.toString();
    }
  } catch (error) {
    console.error("Fehler beim Laden der Transaktion mit der ID :", id, error.message);
  }
  return transaction;
}

async function createTransaction(transaction) {
  try {
    const collection = db.collection("transactions");
    transaction.accountId = new ObjectId(transaction.accountId);
    const result = await collection.insertOne(transaction);
    updateAccount(transaction.accountId, transaction.amount);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Fehler beim Erstellen der Transaktion: ", transaction, error.message);
  }
  return null;
}

export default {
  getAccounts,
  getAccount,
  createAccount,
  getTransactions,
  getTransactionsByAccount,
  getTransaction,
  createTransaction,
};
