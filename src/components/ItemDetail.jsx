import { useCallback, useContext, useEffect, useState } from 'react'
import { CartContext } from './../context/CartProvider'
import { ItemCount } from './ItemCount'

export const ItemDetail = ({
	id,
	title,
	price,
	images,
	description,
	stock,
	sold,
	category,
}) => {
	const [initial, setInitial] = useState(0)
	const { addToCart, productInCartById } = useContext(CartContext)

	const onAdd = count => {
		const item = {
			id,
			title,
			price,
			images,
			description,
			stock,
			sold,
			category,
		}

		addToCart(item, count)
	}

	const initialCount = () => {
		const productInCart = productInCartById(id)

		if (productInCart) {
			setInitial(productInCart.quantity)
		} else {
			stock > 0 ? setInitial(1) : setInitial(0)
		}
	}

	useEffect(() => {
		initialCount()
	}, [id])

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
			<div className="overflow-hidden rounded-md bg-gray-200 aspect-auto">
				<img
					src={images}
					alt={`Cover of the product ${title}`}
					className="h-full w-full object-cover object-center rounded-md"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-700">
					{title}{' '}
					<span className="text-xl font-semibold tracking-tight text-primary/80">
						x{stock}
					</span>
				</h1>
				<p className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-700">
					${price}
				</p>
				<p className="bg-secondary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full w-fit">
					{category?.name}
				</p>
				<p className="text-base text-gray-600">{description}</p>
				<ItemCount initial={initial} stock={stock} onAdd={onAdd} />
			</div>
		</div>
	)
}
