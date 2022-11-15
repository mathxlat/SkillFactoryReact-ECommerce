import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	const addToCart = (item, count) => {
		const productInCart = cart.find(product => product.id === item.id)

		if (productInCart) {
			productInCart.quantity = count

			const newCart = [...cart]

			newCart.splice(cart.indexOf(productInCart), 1, productInCart)

			setCart(newCart)
		} else {
			const product = { ...item, quantity: count }

			setCart([...cart, product])
		}
	}

	const productInCartById = id => {
		return cart.find(product => product.id === id)
	}

	const deleteProductFromCart = id => {
		const productIndex = cart.findIndex(product => product.id === id)

		if (productIndex >= 0) {
			const newCart = [...cart]

			newCart.splice(productIndex, 1)

			setCart(newCart)
		}
	}

	const deleteCart = () => {
		setCart([])
	}

	console.log(cart)

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				productInCartById,
				deleteProductFromCart,
				deleteCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
