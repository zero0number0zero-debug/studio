import {initializeApp, getApp, getApps} from 'firebase/app';
import {getFirestore, collection, getDocs, doc, getDoc} from 'firebase/firestore';
import {firebaseConfig} from './config';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const app = getApp();
const db = getFirestore(app);

export {db, collection, getDocs, doc, getDoc};
