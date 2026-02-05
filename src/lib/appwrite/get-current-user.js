import { Query } from "appwrite";
import { appwriteConfig, databases, account } from "./config";

/* =====================[GET CURRENT USER]===================== */
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    console.log(currentUser.documents[0]);

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log("USER", currentAccount);

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}
