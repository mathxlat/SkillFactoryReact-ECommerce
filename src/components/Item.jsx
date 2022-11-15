import { Link } from 'react-router-dom'
export const Item = ({ id, title, price, images, category, stock }) => {
	return (
		<Link to={`/products/${id}`} key={id} className="group relative">
			<div className="min-h-80 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-80 aspect-auto h-64 md:h-72 lg:h-80 transition-opacity">
				<img
					src={images[0]}
					alt={`Cover of the product ${title}`}
					className="h-full w-full object-cover object-center"
				/>
				{stock === 0 ? (
					<p className="absolute top-2 left-2 text-xs font-medium bg-black text-gray-200 p-1 break-word leading-tight rounded">
						No Stock
					</p>
				) : null}
			</div>
			<div className="mt-2 grid grid-cols-3">
				<h3 className="col-span-2 text-sm text-gray-800 break-word leading-tight">
					{title}
				</h3>
				<p className="col-auto text-right text-xs font-medium text-gray-700">
					${price}
				</p>
			</div>
			<p className="text-xs text-gray-600 break-all">{category.name}</p>
		</Link>
	)
}
