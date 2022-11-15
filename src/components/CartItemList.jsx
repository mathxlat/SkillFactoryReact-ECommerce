import { CartItem } from './CartItem'

export const CartItemList = ({ cart }) => {
	return (
		<div className="flex-1 overflow-y-auto py-6">
			<div className="flow-root">
				<ul role="list" className="-my-6 divide-y divide-gray-200">
					{cart.map(product => (
						<CartItem
							key={product.id}
							id={product.id}
							title={product.title}
							price={product.price}
							images={product.images}
							description={product.description}
							stock={product.stock}
							sold={product.sold}
							category={product.category}
							quantity={product.quantity}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}
