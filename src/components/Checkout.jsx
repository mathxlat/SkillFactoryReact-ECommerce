import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {
	collection,
	addDoc,
	Timestamp,
	doc,
	updateDoc,
} from 'firebase/firestore'

import { CartContext } from './../context/CartProvider'
import { UserContext } from './../context/UserProvider'

import { firestore } from '../firebase'
import { ProductsContext } from './../context/ProductsProvider'
import { OrdersContext } from './../context/OrdersProvider'

export const Checkout = () => {
	const { cart, deleteCart } = useContext(CartContext)
	const { user } = useContext(UserContext)
	const { getProducts } = useContext(ProductsContext)
	const { getOrders } = useContext(OrdersContext)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm()

	const generateOrder = async ({ address, state, city, postalCode }) => {
		if (cart.length > 0) {
			const orderColl = collection(firestore, 'orders')

			if (user) {
				const order = await addDoc(orderColl, {
					buyer: {
						uid: user.uid,
						name: user.name,
						email: user.email,
						address,
						state,
						city,
						postalCode,
					},
					items: cart.map(
						({
							title,
							price,
							images,
							description,
							quantity,
							id,
							category,
						}) => ({
							title,
							images,
							description,
							price,
							quantity,
							id,
							category,
						})
					),
					date: Timestamp.now(),
					total: cart.reduce((acc, curr) => {
						return acc + curr.price * curr.quantity
					}, 0),
				})

				cart.forEach(async product => {
					const productRef = doc(firestore, 'products', product.id)

					const categoryRef = doc(
						firestore,
						'categories',
						product.category.id
					)

					const updateProduct = {
						title: product.title,
						price: product.price,
						stock: product.stock - product.quantity,
						description: product.description,
						images: product.images,
						sold: product.sold + product.quantity,
						category: categoryRef,
					}

					await updateDoc(productRef, updateProduct)
				})

				getOrders()

				getProducts()

				deleteCart()

				navigate(`/orders/${order.id}`)
			}
		}
	}

	const onSubmit = data => {
		generateOrder(data)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 md:grid-cols-2 min-h-full py-12 gap-8">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="order-last md:order-first flex flex-col w-full max-w-md space-y-8"
				>
					<div className="flex flex-col w-full max-w-md space-y-6">
						<h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-700">
							Payment details
						</h2>

						<div className="flex flex-col relative">
							<label
								htmlFor="cardNumber"
								className="block text-xs md:text-sm font-medium text-gray-600"
							>
								Card number
							</label>
							<input
								type="text"
								placeholder="Enter card number"
								id="cardNumber"
								className={`${
									errors.cardNumber
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('cardNumber', {
									required: {
										value: true,
										message: 'Card number is required',
									},
									minLength: {
										value: 19,
										message:
											'Card number should be complete',
									},
									onChange: e => {
										setValue(
											'cardNumber',
											e.target.value
												.replace(/\s|[^0-9]+/g, '')
												.replace(/\W/gi, '')
												.replace(/(.{4})/g, '$1 ')
												.substring(0, 19)
										)
									},
								})}
							/>
							{errors.cardNumber && (
								<p
									role="alert"
									className="text-xs absolute mt-0.5 top-16 text-red-500"
								>
									{errors.cardNumber?.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="col-span-2 flex flex-col relative">
								<label
									htmlFor="expirationDate"
									className="block text-xs md:text-sm font-medium text-gray-600"
								>
									Expiration date (MM/YY)
								</label>
								<input
									type="text"
									placeholder="Enter expiration date"
									id="expirationDate"
									className={`${
										errors.expirationDate
											? 'border-red-400 focus:border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
									{...register('expirationDate', {
										required: {
											value: true,
											message:
												'Expiration date is required',
										},
										minLength: {
											value: 5,
											message:
												'Expiration date should be complete',
										},
										pattern: {
											value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
											message:
												'Entered value does not match expiration date format',
										},
										onChange: e => {
											setValue(
												'expirationDate',
												e.target.value
													.replace(/\s|[^0-9]+/g, '')
													.replace(/\W/gi, '')
													.replace(/(.{2})/g, '$1/')
													.substring(0, 5)
											)
										},
									})}
								/>
								{errors.expirationDate && (
									<p
										role="alert"
										className="text-xs absolute mt-0.5 top-16 text-red-500"
									>
										{errors.expirationDate?.message}
									</p>
								)}
							</div>

							<div className="col-span-1 flex flex-col relative">
								<label
									htmlFor="cvc"
									className="block text-xs md:text-sm font-medium text-gray-600"
								>
									CVC
								</label>
								<input
									type="text"
									placeholder="Enter CVC"
									id="cvc"
									className={`${
										errors.cvc
											? 'border-red-400 focus:border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
									{...register('cvc', {
										required: {
											value: true,
											message: 'CVC is required',
										},
										minLength: {
											value: 3,
											message: 'CVC should be complete',
										},
										pattern: {
											value: /^[0-9]{3,4}$/,
											message:
												'Entered value does not match CVC format',
										},
										onChange: e => {
											setValue(
												'cvc',
												e.target.value
													.replace(/\s|[^0-9]+/g, '')
													.replace(/\W/gi, '')
													.substring(0, 4)
											)
										},
									})}
								/>
								{errors.cvc && (
									<p
										role="alert"
										className="text-xs absolute mt-0.5 top-16 text-red-500"
									>
										{errors.cvc?.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full max-w-md space-y-6">
						<h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-700">
							Shipping address
						</h2>
						<div className="flex flex-col relative">
							<label
								htmlFor="address"
								className="block text-xs md:text-sm font-medium text-gray-600"
							>
								Address
							</label>
							<input
								type="text"
								placeholder="Enter address"
								id="address"
								className={`${
									errors.address
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('address', {
									required: {
										value: true,
										message: 'Address is required',
									},
								})}
							/>
							{errors.address && (
								<p
									role="alert"
									className="text-xs absolute mt-0.5 top-16 text-red-500"
								>
									{errors.address?.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="col-span-1 flex flex-col relative">
								<label
									htmlFor="city"
									className="block text-xs md:text-sm font-medium text-gray-600"
								>
									City
								</label>
								<input
									type="text"
									placeholder="Enter city"
									id="city"
									className={`${
										errors.city
											? 'border-red-400 focus:border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
									{...register('city', {
										required: {
											value: true,
											message: 'City is required',
										},
									})}
								/>
								{errors.city && (
									<p
										role="alert"
										className="text-xs  absolute mt-0.5 top-16 text-red-500"
									>
										{errors.city?.message}
									</p>
								)}
							</div>

							<div className="col-span-1 flex flex-col relative">
								<label
									htmlFor="state"
									className="block text-xs md:text-sm font-medium text-gray-600"
								>
									State / Province
								</label>
								<input
									type="text"
									placeholder="Enter state / province"
									id="state"
									className={`${
										errors.state
											? 'border-red-400 focus:border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
									{...register('state', {
										required: {
											value: true,
											message:
												'State / Province is required',
										},
									})}
								/>
								{errors.state && (
									<p
										role="alert"
										className="text-xs absolute mt-0.5 top-16 text-red-500"
									>
										{errors.state?.message}
									</p>
								)}
							</div>

							<div className="col-span-1 flex flex-col relative">
								<label
									htmlFor="postalCode"
									className="block text-xs md:text-sm font-medium text-gray-600"
								>
									Postal code
								</label>
								<input
									type="text"
									placeholder="Enter postal code"
									id="postalCode"
									className={`${
										errors.postalCode
											? 'border-red-400 focus:border-red-500 focus:ring-red-500'
											: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
									{...register('postalCode', {
										required: {
											value: true,
											message: 'Postal code is required',
										},
									})}
								/>
								{errors.postalCode && (
									<p
										role="alert"
										className="text-xs absolute mt-0.5 top-16 text-red-500"
									>
										{errors.postalCode?.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="mt-7 flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition"
						>
							Confirm Order
						</button>
					</div>
				</form>

				<div className="flex-1 items-end overflow-y-auto w-full space-y-8">
					<h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-700">
						Order summary
					</h2>
					<div className="flow-root">
						<ul
							role="list"
							className="-my-6 divide-y divide-gray-200"
						>
							{cart.map(
								({
									id,
									images,
									title,
									price,
									stock,
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
													<p className="ml-4">
														${price * quantity}
													</p>
												</div>
												<p className="mt-1 text-sm text-gray-500">
													{category.name}
												</p>
											</div>
											<div className="flex flex-1 items-end justify-between text-sm">
												<p className="text-gray-500">
													Quantity {quantity}
												</p>
											</div>
										</div>
									</li>
								)
							)}
						</ul>
					</div>
					<div className="border-t border-gray-200 py-6">
						<div className="flex justify-between text-base font-medium text-gray-700">
							<p>Total</p>
							<p>
								$
								{cart.reduce(
									(acc, curr) =>
										acc + curr.price * curr.quantity,
									0
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
