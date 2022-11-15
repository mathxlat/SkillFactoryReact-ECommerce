import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { OrdersContext } from './../context/OrdersProvider'

export const OrderDetail = () => {
	const [order, setOrder] = useState({
		buyer: {},
		items: [],
		id: '',
		total: 0,
	})
	const { getOrderById } = useContext(OrdersContext)

	const { id } = useParams()

	const getOrderAsync = async () => {
		const orderById = await getOrderById(id)

		setOrder(orderById)
	}

	const getOrder = () => {
		getOrderAsync()
	}

	useEffect(() => {
		getOrder()
	}, [])

	console.log({ order })

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex-1 items-end overflow-y-auto w-full space-y-8">
				<div className="py-5 border-b">
					<p className="text-primary text-medium">It's on the way!</p>
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-700">
						Thanks for ordering
					</h2>
					<p className="text-sm text-gray-600 mt-2">
						We appreciate your order, we're currently processing it.
					</p>
				</div>
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{order.items
							? order.items.map(
									({
										id,
										images,
										title,
										description,
										price,
										quantity,
										category,
									}) => (
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
														<Link
															to={`/products/${id}`}
															as="h3"
														>
															{title}
														</Link>
													</div>
													<p className="mt-1 text-sm text-gray-500">
														{description}
													</p>
												</div>
												<div className="flex flex-1 items-end text-sm gap-2">
													<p className="text-gray-500">
														Quantity {quantity}
													</p>
													<p className="text-gray-400">
														|
													</p>
													<p className="text-gray-500">
														Price $
														{price * quantity}
													</p>
												</div>
											</div>
										</li>
									)
							  )
							: null}
					</ul>
				</div>
				<div className="border-t border-gray-200 py-6">
					<div className="flex justify-between text-base font-medium text-gray-700">
						<p>Shipping address</p>
						<p className="text-sm text-gray-500 font-normal">
							{order.buyer?.state}, {order.buyer?.city},{' '}
							{order.buyer?.address}, {order.buyer?.postalCode}
						</p>
					</div>
				</div>
				<div className="border-t border-gray-200 py-6">
					<div className="flex justify-between text-base font-medium text-gray-700">
						<p>Total</p>
						<p>${order.total}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
