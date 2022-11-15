import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartProvider'
import { CartItemList } from './CartItemList'
import { UserContext } from '../context/UserProvider'

export const CartItemListContainer = () => {
	const { cart } = useContext(CartContext)
	const { user } = useContext(UserContext)

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="py-10 flex items-start justify-center border-b border-gray-200">
				<h1 className="text-3xl font-bold text-gray-700">
					Shopping cart
				</h1>
			</div>

			<CartItemList cart={cart} />

			{cart.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-base text-gray-600 py-4">
					<p className="text-2xl font-medium">Your cart is empty</p>
					<p className="mt-4 text-sm text-gray-500">
						Don't know what to buy?
					</p>
					<p className="text-sm text-gray-500">
						Thousands of products are waiting for you.
					</p>
				</div>
			) : (
				<div className="border-t border-gray-200 py-6">
					<div className="flex justify-between text-base font-medium text-gray-700">
						<p>Subtotal</p>
						<p>
							$
							{cart.reduce(
								(acc, curr) => acc + curr.price * curr.quantity,
								0
							)}
						</p>
					</div>
					<p className="mt-0.5 text-sm text-gray-500">
						Shipping calculated at checkout.
					</p>
					<div className="mt-6">
						{user ? (
							<Link
								to="/checkout"
								className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary transition"
							>
								Checkout
							</Link>
						) : (
							<Link
								to="/login"
								className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary transition"
							>
								Log in
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
