import { useEffect, useState } from 'react'
import { PlusSmallIcon, MinusSmallIcon } from '@heroicons/react/24/outline'

export const ItemCount = ({ initial = 0, stock = 0, onAdd }) => {
	const [count, setCount] = useState(initial)

	const increase = () => {
		const newValue = count + 1

		if (newValue <= stock) {
			setCount(newValue)
		}
	}

	const decrease = () => {
		const newValue = count - 1

		newValue >= 0 && setCount(newValue)
	}

	useEffect(() => {
		setCount(initial)
	}, [initial])

	return (
		<div className="mt-3">
			<div className="flex items-center gap-2">
				<div className="flex justify-between items-center w-24 p-1 border-2">
					<button
						disabled={count <= 0}
						onClick={decrease}
						className="text-gray-400 hover:text-gray-700 transition-colors disabled:hover:text-gray-400"
					>
						<MinusSmallIcon
							className="h-6 w-6"
							aria-hidden="true"
						/>
					</button>
					<p className="text-sm font-semibold text-gray-700">
						{count}
					</p>
					<button
						disabled={count >= stock}
						onClick={increase}
						className="text-gray-400 hover:text-gray-700 transition-colors disabled:hover:text-gray-400"
					>
						<PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				{stock === 0 ? (
					<p className="text-base text-gray-600">No Stock</p>
				) : null}
			</div>
			<button
				disabled={count > stock || stock === 0}
				className="mt-7 flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition disabled:opacity-75 disabled:hover:bg-primary"
				onClick={() => onAdd(count)}
			>
				Add to cart
			</button>
		</div>
	)
}
