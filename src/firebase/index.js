// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_CONFIG_API_KEY,
	authDomain: 'sf-store-app.firebaseapp.com',
	projectId: 'sf-store-app',
	storageBucket: 'sf-store-app.appspot.com',
	messagingSenderId: '348188331170',
	appId: '1:348188331170:web:584f00b54afaf695ad1bfb',
}

export const firebaseApp = initializeApp(firebaseConfig)

export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
