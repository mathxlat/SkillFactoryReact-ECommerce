import { useState } from 'react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export const CartItemCount = ({ initial = 0, stock = 0, onAdd }) => {
	const [count, setCount] = useState(initial)

	const increase = () => {
		const newValue = count + 1

		if (newValue <= stock) {
			setCount(newValue)

			onAdd(newValue)
		}
	}

	const decrease = () => {
		const newValue = count - 1

		if (newValue >= 1) {
			setCount(newValue)

			onAdd(newValue)
		}
	}

	return (
		<div className="flex justify-between items-center w-20 p-1 border-2">
			<button
				disabled={count <= 1}
				onClick={decrease}
				className="text-gray-400 hover:text-gray-700 transition-colors disabled:hover:text-gray-400"
			>
				<MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
			</button>
			<p className="text-xs font-semibold text-gray-700">{count}</p>
			<button
				disabled={count >= stock}
				onClick={increase}
				className="text-gray-400 hover:text-gray-700 transition-colors disabled:hover:text-gray-400"
			>
				<PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
			</button>
		</div>
	)
}
