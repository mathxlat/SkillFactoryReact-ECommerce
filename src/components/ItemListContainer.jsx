import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ProductsContext } from '../context/ProductsProvider'
import { CategoriesContext } from '../context/CategoriesProvider'
import { ItemList } from './ItemList'

export const ItemListContainer = () => {
	const [selectedCategory, setSelectedCategory] = useState()

	const { products } = useContext(ProductsContext)
	const { categories } = useContext(CategoriesContext)

	let [searchParams, setSearchParams] = useSearchParams()

	const category = searchParams.get('category')

	const handleCategoryChange = event => {
		if (event.target.value) {
			setSearchParams(`category=${event.target.value}`)
		} else {
			setSearchParams('')
		}

		setSelectedCategory(event.target.value)
	}

	const getFilteredList = () => {
		if (!selectedCategory) {
			return products
		}

		return products.filter(item => item.category.name === selectedCategory)
	}

	const filteredList = useMemo(getFilteredList, [
		selectedCategory,
		products,
		category,
	])

	useEffect(() => {
		if (category) {
			setSelectedCategory(category)
		}
	}, [])

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex justify-end pt-4">
				<select
					name="category-list"
					id="category-list"
					value={selectedCategory}
					onChange={handleCategoryChange}
					className="text-sm font-medium text-gray-700 hover:text-gray-900 border-none rounded block"
				>
					<option value="">All</option>
					{categories.map(category => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>
			<ItemList products={filteredList} />
		</div>
	)
}
