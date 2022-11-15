import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartItemCount } from './CartItemCount'
import { CartContext } from '../context/CartProvider'

export const CartItem = ({
	id,
	title,
	price,
	images,
	description,
	stock,
	sold,
	category,
	quantity,
}) => {
	const { addToCart, deleteProductFromCart } = useContext(CartContext)

	const onAdd = count => {
		const product = {
			id,
			title,
			price,
			images,
			description,
			stock,
			sold,
			category,
			quantity,
		}

		addToCart(product, count)
	}

	return (
		<li key={id} className="flex py-6">
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
				<img
					src={images}
					alt={`Cover of the product ${title}`}
					className="h-full w-full object-cover object-center"
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between text-base font-medium text-gray-700">
						<Link to={`/products/${id}`} as="h3">
							{title}
						</Link>
						<p className="ml-4">${price * quantity}</p>
					</div>
					<p className="mt-1 text-sm text-gray-500">
						{category.name}
					</p>
				</div>
				<div className="flex flex-1 items-end justify-between text-sm">
					<CartItemCount
						initial={quantity}
						stock={stock}
						onAdd={onAdd}
					/>

					<div className="flex">
						<button
							type="button"
							className="font-medium text-primary hover:text-secondary transition"
							onClick={() => deleteProductFromCart(id)}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}
