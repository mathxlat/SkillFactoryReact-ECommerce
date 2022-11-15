import { createContext, useState, useEffect } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { firestore } from './../firebase'

export const OrdersContext = createContext()

export const OrdersProvider = ({ children }) => {
	const [orders, setOrders] = useState([])

	const ordersCollectionRef = collection(firestore, 'orders')

	const getOrders = async () => {
		const ordersSnap = await getDocs(ordersCollectionRef)

		const ordersData = ordersSnap.docs.map(order => {
			const orderData = order.data()

			return {
				...orderData,
				id: order.id,
			}
		})

		setOrders(ordersData)
	}

	const getOrderById = async id => {
		const orderRef = doc(firestore, 'orders', id)

		const orderSnap = await getDoc(orderRef)

		const orderData = orderSnap.data()

		return {
			...orderData,
			id: orderSnap.id,
		}
	}

	useEffect(() => {
		getOrders()
	}, [])

	console.log(orders)

	return (
		<OrdersContext.Provider value={{ orders, getOrders, getOrderById }}>
			{children}
		</OrdersContext.Provider>
	)
}
