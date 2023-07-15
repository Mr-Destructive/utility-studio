import { Account, Appwrite, Functions, Storage } from "@refinedev/appwrite";
import nookies from "nookies";

const APPWRITE_URL = "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "utility-studio-test";
export const APPWRITE_TOKEN_KEY = "c6b5379ba56d5ef1ab15d3242782013bcbf1758fb0d6f982aff363f8dbb294beaec192b8058f8746ca1accdac5509e7806d437b4b3c5afbf3478aef6b1bbb95918a9712b477cfe015cb9f43c4f7a1bf2b452563cd6d85aba7092dbf0a71d7d5f6fa5d46e3d33910c9b14a8726438c9663ea2b921fbf5fbf7d1e565431d8eb500";

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
