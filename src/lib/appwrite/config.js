import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_CONFIG_URL,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,

  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // database
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID, // storage (2GB Limits)
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID, // users collection
  jobCollectionId: process.env.NEXT_PUBLIC_APPWRITE_JOB_COLLECTION_ID,
  userChatsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_USER_CHATS_COLLECTION_ID,
  chatsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CHATS_COLLECTION_ID,
};
export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
