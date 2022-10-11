
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5N_CUSkZcbqnMuJbuULvfbA2Qm8HCEQg",
  authDomain: "fir-yt-cs.firebaseapp.com",
  projectId: "fir-yt-cs",
  storageBucket: "fir-yt-cs.appspot.com",
  messagingSenderId: "703471820832",
  appId: "1:703471820832:web:4876e57f47c933d62b9c45"
};

const app = initializeApp(firebaseConfig);

export default app