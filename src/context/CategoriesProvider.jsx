import { createContext, useState, useEffect } from 'react'
import {
	collection,
	getDocs,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore'

import { firestore } from './../firebase'

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
	const [categories, setCategories] = useState([])

	const categoriesCollectionRef = collection(firestore, 'categories')

	const createCategory = async newCategory => {
		await addDoc(categoriesCollectionRef, newCategory)
	}

	const updateCategory = async (id, changeCategory) => {
		const categoryRef = doc(firestore, 'categories', id)

		await updateDoc(categoryRef, changeCategory)
	}

	const deleteCategory = async id => {
		const categoryRef = doc(firestore, 'categories', id)

		await deleteDoc(categoryRef)

		await getCategories()
	}

	const getCategories = async () => {
		const categoriesSnap = await getDocs(categoriesCollectionRef)

		const categoriesData = categoriesSnap.docs.map(category => {
			const categoryData = category.data()

			return {
				...categoryData,
				id: category.id,
			}
		})

		setCategories(categoriesData)
	}

	useEffect(() => {
		getCategories()
	}, [])

	console.log(categories)

	return (
		<CategoriesContext.Provider
			value={{
				categories,
				getCategories,
				createCategory,
				updateCategory,
				deleteCategory,
			}}
		>
			{children}
		</CategoriesContext.Provider>
	)
}
