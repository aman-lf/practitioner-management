// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import logger from './utils/logger';
``;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkIJs4PMQhQJvBDlJ3iCHg7YgUVGXIzio',
  authDomain: 'practitioner-manager.firebaseapp.com',
  projectId: 'practitioner-manager',
  storageBucket: 'practitioner-manager.appspot.com',
  messagingSenderId: '130553351306',
  appId: '1:130553351306:web:a0caedab3cb9d0e7bcb173',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const upload = (name, file) => {
  uploadBytes(ref(storage, name), file.buffer).then((snapshot) => {
    logger.info(`Uploaded a blob or file!`);
  });
};
