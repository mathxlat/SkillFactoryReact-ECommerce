import { useState, createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, firestore } from './../firebase'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const getUserFirestore = async uid => {
		const userRef = doc(firestore, 'users', uid)

		const userSnap = await getDoc(userRef)

		return userSnap.data()
	}

	const setUserWithFirestore = async userFromAuth => {
		const userFromFirestore = await getUserFirestore(userFromAuth.uid)

		const userWithAuthAndFirestore = {
			...userFromFirestore,
			...userFromAuth,
		}

		setUser(userWithAuthAndFirestore)
	}

	onAuthStateChanged(auth, userFromAuth => {
		if (userFromAuth) {
			if (!user) {
				setUserWithFirestore(userFromAuth)
			}
		} else {
			setUser(null)
		}
	})

	console.log(user)

	return (
		<UserContext.Provider value={{ hola: 'hola', adios: 'adios', user }}>
			{children}
		</UserContext.Provider>
	)
}
