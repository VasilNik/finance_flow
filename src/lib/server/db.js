import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";
import { get } from "svelte/store";

console.log("URI", DB_URI)
const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("FinanceFlow"); // select database

//////////////////////////////////////////
// Accounts
//////////////////////////////////////////

// Get all accounts
async function getAccounts() {
  let accounts = [];
  try {
    const collection = db.collection("accounts");
    const query = {};

    // Get all objects that match the query
    accounts = await collection.find(query).toArray();
    accounts.forEach((account) => {
      account._id = account._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return accounts;
}

// Get account by id
async function getAccount(id) {
  let account = null;
  try {
    const collection = db.collection("accounts");
    const query = { _id: new ObjectId(id) }; // filter by id
    console.log("Querying account with:", query);
    account = await collection.findOne(query);

    if (!account) {
      console.log("No account with id " + id);
      // TODO: errorhandling
    } else {
      account._id = account._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return account;
}

async function createAccount(account) {
  console.log("Creating account", account);
  try {
    const collection = db.collection("accounts");
    const result = await collection.insertOne(account);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

async function updateAccount(accountId, amount) {
  try {
    const account = await getAccount(accountId);

    if (!account) {
      console.log("Account not found: " + accountId);
      return;
    }

    const id = account._id;
    account.balance += amount;
    delete account._id;

    const collection = db.collection("accounts");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: account });

    if (result.matchedCount === 0) {
      console.log("No account with id " + id);
    } else {
      console.log("Account with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontos:", error.message);
  }
}

//////////////////////////////////////////
// Transactions
//////////////////////////////////////////

// Get all transactions
async function getTransactions() {
  let transactions = [];
  try {
    const collection = db.collection("transactions");
    const query = {};

    // Get all objects that match the query
    transactions = (await collection.find(query).sort({ date: -1 }).toArray()); // sort by date descending
    transactions.forEach((transaction) => {
      transaction._id = transaction._id.toString(); // convert ObjectId to String
      transaction.accountId = transaction.accountId.toString();
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return transactions;
}

// Get transactions by id
async function getTransactionsByAccount(id) {
  let transactions = [];
  try {
    const collection = db.collection("transactions");
    const query = { accountId: new ObjectId(id) }; // filter by id

    // Get all objects that match the query
    transactions = (await collection.find(query).sort({ date: -1 }).toArray()); // sort by date descending
    transactions.forEach((transaction) => {
      transaction._id = transaction._id.toString(); // convert ObjectId to String
      transaction.accountId = transaction.accountId.toString();
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return transactions;
}

// Get transaction by id
async function getTransaction(id) {
  let transaction = null;
  try {
    const collection = db.collection("transactions");
    const query = { _id: new ObjectId(id) }; // filter by id
    console.log("Querying transaction with:", query);
    transaction = await collection.findOne(query);
    transaction.accountId = transaction.accountId.toString(); // convert ObjectId to String

    if (!transaction) {
      console.log("No transaction with id " + id);
      // TODO: errorhandling
    } else {
      transaction._id = transaction._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return transaction;
}

async function createTransaction(transaction) {
  try {
    const collection = db.collection("transactions");
    transaction.accountId = new ObjectId(transaction.accountId);
    const result = await collection.insertOne(transaction);
    updateAccount(transaction.accountId, transaction.amount); // update the account balance
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getAccounts,
  getAccount,
  createAccount,
  getTransactions,
  getTransactionsByAccount,
  getTransaction,
  createTransaction,
};
