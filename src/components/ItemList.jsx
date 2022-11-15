import { Item } from './Item'

export const ItemList = ({ products }) => {
	return (
		<div className="my-6 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{products.map(({ id, title, price, images, stock, category }) => (
				<Item
					key={id}
					id={id}
					title={title}
					price={price}
					images={images}
					category={category}
					stock={stock}
				/>
			))}
		</div>
	)
}
