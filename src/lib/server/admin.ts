import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from "firebase-admin";

require("dotenv").config({ path: __dirname + "/../static/private/.env" }); // adjust the path as needed

const FB_CLIENT_EMAIL = process.env.FB_CLIENT_EMAIL;
const FB_PRIVATE_KEY = process.env.FB_PRIVATE_KEY;
const FB_PROJECT_ID = process.env.FB_PROJECT_ID;

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: FB_PROJECT_ID,
            clientEmail: FB_CLIENT_EMAIL,
            privateKey: FB_PRIVATE_KEY,
        }),
    });
} catch (err) {
    if (!/already exists/u.test((err as Error).message)) {
        console.error("Firebase Admin Error: ", (err as Error).stack);
    }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
