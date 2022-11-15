import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { CartContext } from '../context/CartProvider'

export const CartWidget = () => {
	const { cart } = useContext(CartContext)

	return (
		<div className="ml-4 flow-root lg:ml-6">
			<NavLink to="/cart" className="group -m-2 flex items-center p-2">
				<ShoppingBagIcon
					className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0 text-gray-500 group-hover:text-gray-600"
					aria-hidden="true"
				/>
				<span className="ml-2 text-sm md:text-base text-gray-500 group-hover:text-gray-600">
					{cart.reduce((acc, curr) => acc + curr.quantity, 0)}
				</span>
				<span className="sr-only">items in cart, view bag</span>
			</NavLink>
		</div>
	)
}
