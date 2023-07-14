import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJVQx1FPUrbQZa_bNgvimpR4w1K0BZmsw",
    authDomain: "firesvelte-96652.firebaseapp.com",
    projectId: "firesvelte-96652",
    storageBucket: "firesvelte-96652.appspot.com",
    messagingSenderId: "242443476388",
    appId: "1:242443476388:web:abdc3606e100a3761bb531",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn("Auth is not initialized or not in browser");
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe,
        };
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
    };
}

export const user = userStore();
