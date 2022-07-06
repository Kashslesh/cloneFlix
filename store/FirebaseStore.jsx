import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';



const firebaseConfig = {
  apiKey: 'AIzaSyBlbr68FxGmmTjnlxVwas9KnIB56g4goPE',
  authDomain: 'cloneflix-c9b31.firebaseapp.com',
  projectId: 'cloneflix-c9b31',
  storageBucket: 'cloneflix-c9b31.appspot.com',
  messagingSenderId: '1089941050984',
  appId: '1:1089941050984:web:f5d618858dd51f9b750ddd',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
