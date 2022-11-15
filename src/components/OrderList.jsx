import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { OrdersContext } from '../context/OrdersProvider'
import { UserContext } from '../context/UserProvider'

export const OrderList = () => {
	const { orders } = useContext(OrdersContext)
	const { user } = useContext(UserContext)

	console.log(orders)

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex-1 items-end overflow-y-auto w-full space-y-8">
				<div className="py-8">
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-700">
						Your Orders
					</h2>
				</div>
			</div>
			{orders.filter(order => order.buyer.uid === user.uid) !== 0 ? (
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{orders
							.filter(order => order.buyer.uid === user.uid)
							.map(order => (
								<li key={order.id} className="flex py-6">
									<div className="flex flex-1 flex-col">
										<div className="flex justify-between text-base font-medium text-gray-700">
											<div className="flex flex-col md:flex-row gap-4">
												<div className="flex flex-col">
													<p className="text-gray-700">
														Order number
													</p>
													<p className="font-normal text-gray-600">
														{order.id}
													</p>
												</div>
												<div className="flex flex-col">
													<p className="text-gray-700">
														Date placed
													</p>
													<p className="font-normal text-gray-600">
														{new Date(
															order.date.seconds *
																1000
														).toDateString()}
													</p>
												</div>
												<div className="flex flex-col">
													<p className="text-gray-700">
														Total amount
													</p>
													<p className="text-gray-600">
														${order.total}
													</p>
												</div>
											</div>
											<Link
												to={`/orders/${order.id}`}
												as="p"
												className="text-primary hover:text-secondary"
											>
												View order
											</Link>
										</div>
									</div>
								</li>
							))}
					</ul>
				</div>
			) : (
				<div>
					<div className="flex flex-col items-center justify-center text-base text-gray-600 py-4">
						<p className="text-2xl font-medium">
							Your orders is empty
						</p>
						<p className="mt-4 text-sm text-gray-500">
							Don't know what to buy?
						</p>
						<p className="text-sm text-gray-500">
							Thousands of products are waiting for you.
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
