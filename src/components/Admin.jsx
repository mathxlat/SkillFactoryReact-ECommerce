import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { ProductsContext } from './../context/ProductsProvider'
import { CategoriesContext } from '../context/CategoriesProvider'

export const Admin = () => {
	const { products, deleteProduct } = useContext(ProductsContext)
	const { categories, deleteCategory } = useContext(CategoriesContext)

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="py-10 flex-1 items-end w-full space-y-8">
				<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-700">
					Admin panel
				</h2>
				<div className="flex gap-4">
					<Link
						to="/add-category"
						className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-sm md:text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition"
					>
						Add category
					</Link>
					<Link
						to="/add-product"
						className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-sm md:text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition"
					>
						Add product
					</Link>
				</div>
				<div className="py-6 flow-root border-b border-gray-200">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{categories.map(({ id, name }) => (
							<li key={id} className="flex py-6">
								<div className="flex flex-1 flex-col">
									<div className="flex justify-between text-base font-medium text-gray-700">
										<h3>{name}</h3>
										<div className="flex justify-center items-center gap-2">
											<Link to={`/update-category/${id}`}>
												<PencilSquareIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-600 transition" />
											</Link>
											<button
												onClick={() =>
													deleteCategory(id)
												}
											>
												<TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{products.map(
							({
								id,
								images,
								title,
								description,
								price,
								stock,
								category,
								sold,
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
												<div className="flex justify-center items-center gap-2">
													<Link
														to={`/update-product/${id}`}
													>
														<PencilSquareIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-600 transition" />
													</Link>
													<button
														onClick={() =>
															deleteProduct(id)
														}
													>
														<TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
													</button>
												</div>
											</div>
											<p className="mt-1 text-sm text-gray-500">
												{description}
											</p>
										</div>
										<div className="flex flex-1 flex-col sm:flex-row text-sm gap-2 py-2">
											<p className="text-gray-500">
												Stock: {stock}
											</p>
											<p className="hidden sm:block text-gray-400">
												|
											</p>
											<p className="text-gray-500">
												Price: ${price}
											</p>
											<p className="hidden sm:block text-gray-400">
												|
											</p>
											<p className="text-gray-500">
												Category: {category.name}
											</p>
											<p className="hidden sm:block text-gray-400">
												|
											</p>
											<p className="text-gray-500">
												Sold: {sold}
											</p>
										</div>
									</div>
								</li>
							)
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}
