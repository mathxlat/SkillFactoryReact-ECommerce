import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from './../context/ProductsProvider'
import { ItemDetail } from './ItemDetail'

export const ItemDetailContainer = () => {
	const [product, setProduct] = useState({})
	const { products, getProductById } = useContext(ProductsContext)

	const { id } = useParams()

	const getProductAsync = async () => {
		const productById = await getProductById(id)

		setProduct(productById)
	}

	const getProduct = () => {
		if (products.length) {
			const productById = products.find(product => product.id === id)

			setProduct(productById)
		} else {
			getProductAsync()
		}
	}

	useEffect(() => {
		getProduct()
	}, [])

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<ItemDetail
				id={product?.id}
				title={product?.title}
				price={product?.price}
				images={product?.images}
				description={product?.description}
				stock={product?.stock}
				sold={product?.sold}
				category={product?.category}
			/>
		</div>
	)
}
