import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCkPKfeyCqyKBKoIgSky4SgYLYtMDbUIrg",
	authDomain: "todolist-ccbd1.firebaseapp.com",
	databaseURL:
		"https://todolist-ccbd1-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "todolist-ccbd1",
	storageBucket: "todolist-ccbd1.appspot.com",
	messagingSenderId: "575138879278",
	appId: "1:575138879278:web:f722d0b1f0bc0caaa70cbf",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
