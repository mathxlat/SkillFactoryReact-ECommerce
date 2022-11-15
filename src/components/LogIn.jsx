// import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/20/solid'

import { auth } from './../firebase'
// import { UserContext } from '../context/UserProvider'

export const LogIn = () => {
	// const { user } = useContext(UserContext)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			// console.log('user uid', userCredential.user.uid)
		} catch (error) {
			console.error(error)
		}
	}

	const onSubmit = ({ email, password }) => {
		signIn(email, password)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
							Log in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<Link
								to="/signup"
								className="font-medium text-primary hover:text-secondary transition-colors"
							>
								start your adventure
							</Link>
						</p>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col mt-8 space-y-6"
					>
						<div className="flex flex-col relative">
							<label
								htmlFor="email"
								className="block font-medium text-gray-600"
							>
								Email
							</label>
							<input
								type="email"
								placeholder="Enter email"
								id="email"
								className={`${
									errors.email
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('email', {
									required: {
										value: true,
										message: 'Email Address is required',
									},
									pattern: {
										value: /\S+@\S+\.\S+/,
										message:
											'Entered value does not match email format',
									},
								})}
							/>
							{errors.email && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.email?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col relative">
							<label
								htmlFor="password"
								className="block font-medium text-gray-600"
							>
								Password
							</label>
							<input
								type="password"
								placeholder="Enter password"
								id="password"
								className={`${
									errors.password
										? 'border-red-400 focus:border-red-500 focus:ring-red-500'
										: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								} mt-1 block w-full rounded-md sm:text-sm shadow-sm`}
								{...register('password', {
									required: {
										value: true,
										message: 'Password is required',
									},
									minLength: {
										value: 6,
										message:
											'Password should be at least 6 characters',
									},
								})}
							/>
							{errors.password && (
								<p
									role="alert"
									className="text-xs absolute -bottom-5 text-red-500"
								>
									{errors.password?.message}
								</p>
							)}
						</div>
						<div className="pt-2">
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-secondary group-hover:text-primary transition-colors"
										aria-hidden="true"
									/>
								</span>
								Log in
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
