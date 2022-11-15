import { useContext, useEffect } from 'react'
import { useNavigate, useParams, useHref } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { doc } from 'firebase/firestore'

import { ProductsContext } from '../context/ProductsProvider'
import { CategoriesContext } from '../context/CategoriesProvider'
import { firestore } from '../firebase'

export const ProductForm = () => {
	const { getProducts, products, createProduct, updateProduct } =
		useContext(ProductsContext)

	const { categories } = useContext(CategoriesContext)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const href = useHref()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (href === `/update-product/${id}`) {
			const product = products.find(product => product.id === id)

			if (product) {
				reset({
					title: product.title,
					price: product.price,
					images: product.images.join(','),
					description: product.description,
					stock: product.stock,
					category: product.category.id,
					sold: product.sold,
				})
			} else {
				navigate('/create-product')
			}
		} else {
			reset({
				title: '',
				price: 0,
				images: [''],
				description: '',
				stock: 0,
				category: categories[0].id,
				sold: 0,
			})
		}
	}, [reset, href, id, navigate])

	const onSubmit = async data => {
		const categoryRef = doc(firestore, 'categories', data.category)

		const images = data.images.split(',')

		if (href === `/update-product/${id}`) {
			const changeProduct = {
				...data,
				category: categoryRef,
				images,
			}

			await updateProduct(id, changeProduct)

			await getProducts()

			navigate('/admin')
		} else {
			const newProduct = {
				...data,
				category: categoryRef,
				images,
			}

			await createProduct(newProduct)

			await getProducts()

			navigate('/admin')
		}
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
							{href === `/update-product/${id}`
								? 'Update product'
								: 'Create product'}
						</h2>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col mt-8 space-y-6"
					>
						<div className="flex flex-col relative">
							<label
								htmlFor="title"
								className="block font-medium text-gray-600"
							>
								Title
							</label>
							<input
								type="text"
								placeholder="Enter title"
								id="title"
								className={`${
									errors.title
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('title', {
									required: {
										value: true,
										message: 'Title is required',
									},
								})}
							/>
							{errors.title && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.title?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="price"
								className="block font-medium text-gray-600"
							>
								Price
							</label>
							<input
								type="number"
								placeholder="Enter price"
								id="price"
								className={`${
									errors.price
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('price', {
									required: {
										value: true,
										message: 'Price is required',
									},
									min: {
										value: 0,
										message: 'Price must be greater than 0',
									},
									valueAsNumber: {
										value: true,
										message: 'Price must be a number',
									},
								})}
							/>
							{errors.price && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.price?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="images"
								className="block font-medium text-gray-600"
							>
								Images
							</label>
							<input
								type="text"
								placeholder="Enter images"
								id="images"
								className={`${
									errors.images
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('images', {
									required: {
										value: true,
										message: 'Images is required',
									},
								})}
							/>
							{errors.images && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.images?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="description"
								className="block font-medium text-gray-600"
							>
								Description
							</label>
							<textarea
								type="text"
								rows={3}
								placeholder="Enter description"
								id="description"
								className={`${
									errors.description
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('description', {
									required: {
										value: true,
										message: 'Description is required',
									},
								})}
							/>
							{errors.description && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.description?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="category"
								className="block font-medium text-gray-600"
							>
								Category
							</label>
							<select
								id="category"
								className={`${
									errors.category
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('category', {
									required: {
										value: true,
										message: 'category is required',
									},
								})}
							>
								{categories.map(category => (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</select>
							{errors.category && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.category?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="stock"
								className="block font-medium text-gray-600"
							>
								Stock
							</label>
							<input
								type="number"
								placeholder="Enter stock"
								id="stock"
								className={`${
									errors.stock
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('stock', {
									required: {
										value: true,
										message: 'Stock is required',
									},
									min: {
										value: 0,
										message: 'Stock must be greater than 0',
									},
									valueAsNumber: {
										value: true,
										message: 'Stock must be a number',
									},
								})}
							/>
							{errors.stock && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.stock?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="sold"
								className="block font-medium text-gray-600"
							>
								Sold
							</label>
							<input
								type="number"
								placeholder="Enter sold"
								id="sold"
								className={`${
									errors.sold
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('sold', {
									required: {
										value: true,
										message: 'Sold is required',
									},
									min: {
										value: 0,
										message: 'Sold must be greater than 0',
									},
									valueAsNumber: {
										value: true,
										message: 'Sold must be a number',
									},
								})}
							/>
							{errors.sold && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.sold?.message}
								</p>
							)}
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
							>
								{href === `/update-product/${id}`
									? 'Update product'
									: 'Create product'}
							</button>
						</div>
						<div
							className={`${
								Object.keys(errors).length > 0
									? 'visible'
									: 'invisible'
							}`}
						>
							<p className="text-sm text-center text-red-500">
								There are errors, check form.
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
