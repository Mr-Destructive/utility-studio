import { Account, Appwrite, Functions, Storage } from "@refinedev/appwrite";
import nookies from "nookies";

const APPWRITE_URL = process.env.APPWRITE_API_ENDPOINT;
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT;
export const APPWRITE_TOKEN_KEY = process.env.APPWRITE_TOKEN_KEY;
export const AUDIO_FUNCTION_ID = process.env.AUDIO_FUNCTION_ID;
export const VIDEO_FUNCTION_ID = process.env.VIDEO_FUNCTION_ID;
export const SUBTITLE_FUNCTION_ID = process.env.SUBTITLE_FUNCTION_ID;
export const DOCUMENTS_FUNCTION_ID = process.env.DOCUMENTS_FUNCTION_ID;
export const AUDIO_BUCKET_ID = process.env.AUDIO_BUCKET_ID;
export const VIDEO_BUCKET_ID = process.env.VIDEO_BUCKET_ID;
export const DOCUMENTS_BUCKET_ID = process.env.DOCUMENTS_BUCKET_ID;

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for client side authentication
const cookies = nookies.get();
const appwriteJWT = cookies[APPWRITE_TOKEN_KEY];
if (appwriteJWT) {
  appwriteClient.setJWT(appwriteJWT);
}

const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const functions = new Functions(appwriteClient);
export { appwriteClient, account, functions, storage };
