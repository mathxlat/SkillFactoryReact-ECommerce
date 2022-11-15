import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import ecommerceLogo from '../assets/e-commerce.svg'

export const Home = () => {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
				<div className="flex flex-col gap-2 justify-center">
					<h1 className="text-4xl font-bold text-gray-800">
						StoreApp
					</h1>
					<p>Discover the latest in shopping</p>
					<Link
						to="/products"
						className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-sm md:text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition"
					>
						Go to products
						<ChevronRightIcon className="w-5 h-5" />
					</Link>
				</div>
				<div className="overflow-hidden rounded-md bg-gray-200 aspect-auto">
					<img
						src={ecommerceLogo}
						className="h-full w-full object-cover object-center rounded-md"
						alt="E-commerce logo"
					/>
				</div>
			</div>
		</div>
	)
}
