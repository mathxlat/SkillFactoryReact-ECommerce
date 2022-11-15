import { createContext, useState, useEffect } from 'react'
import {
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore'

import { firestore } from './../firebase'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([])

	const productsCollectionRef = collection(firestore, 'products')

	const getProducts = async () => {
		const productsSnap = await getDocs(productsCollectionRef)

		const productsData = await Promise.all(
			productsSnap.docs.map(async product => {
				const productData = product.data()

				const category = await getDoc(productData.category)

				return {
					...productData,
					id: product.id,
					category: { ...category.data(), id: category.id },
				}
			})
		)

		setProducts(productsData)
	}

	const createProduct = async newProduct => {
		await addDoc(productsCollectionRef, newProduct)
	}

	const updateProduct = async (id, changeProduct) => {
		const productRef = doc(firestore, 'products', id)

		await updateDoc(productRef, changeProduct)
	}

	const deleteProduct = async id => {
		const productRef = doc(firestore, 'products', id)

		await deleteDoc(productRef)

		await getProducts()
	}

	const getProductById = async id => {
		const productRef = doc(firestore, 'products', id)

		const productSnap = await getDoc(productRef)

		const productData = productSnap.data()

		const category = await getDoc(productData.category)

		return {
			...productData,
			id: productSnap.id,
			category: { ...category.data(), id: category.id },
		}
	}

	useEffect(() => {
		getProducts()
	}, [])

	console.log(products)

	return (
		<ProductsContext.Provider
			value={{
				products,
				getProducts,
				getProductById,
				createProduct,
				updateProduct,
				deleteProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}
