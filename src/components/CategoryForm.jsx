import { useContext, useEffect } from 'react'
import { useNavigate, useParams, useHref } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { CategoriesContext } from '../context/CategoriesProvider'

export const CategoryForm = () => {
	const { categories, getCategories, createCategory, updateCategory } =
		useContext(CategoriesContext)

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
		if (href === `/update-category/${id}`) {
			const category = categories.find(category => category.id === id)

			if (category) {
				reset({
					name: category.name,
				})
			} else {
				navigate('/create-category')
			}
		} else {
			reset({
				name: '',
			})
		}
	}, [reset, href, id, navigate])

	const onSubmit = async data => {
		if (href === `/update-category/${id}`) {
			const changeCategory = {
				...data,
			}

			await updateCategory(id, changeCategory)

			await getCategories()

			navigate('/admin')
		} else {
			const newCategory = {
				...data,
			}

			await createCategory(newCategory)

			await getCategories()

			navigate('/admin')
		}
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
							{href === `/update-category/${id}`
								? 'Update category'
								: 'Create category'}
						</h2>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col mt-8 space-y-6"
					>
						<div className="flex flex-col relative">
							<label
								htmlFor="name"
								className="block font-medium text-gray-600"
							>
								Name
							</label>
							<input
								type="text"
								placeholder="Enter name"
								id="name"
								className={`${
									errors.name
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('name', {
									required: {
										value: true,
										message: 'Name is required',
									},
								})}
							/>
							{errors.name && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.name?.message}
								</p>
							)}
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
							>
								{href === `/update-category/${id}`
									? 'Update category'
									: 'Create category'}
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
