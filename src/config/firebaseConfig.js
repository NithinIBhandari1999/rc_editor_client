import { initializeApp } from 'firebase/app';

import envKeys from './envKeys';

const firebaseConfig = {
    apiKey: envKeys.FIREBASE_apiKey,
    authDomain: envKeys.FIREBASE_authDomain,
    databaseURL: envKeys.FIREBASE_databaseURL,
    projectId: envKeys.FIREBASE_projectId,
    storageBucket: envKeys.FIREBASE_storageBucket,
    messagingSenderId: envKeys.FIREBASE_messagingSenderId,
    appId: envKeys.FIREBASE_appId
};

const app = initializeApp(firebaseConfig);

export default app;