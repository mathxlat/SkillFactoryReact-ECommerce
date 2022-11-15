import { Fragment, useState, useContext } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import { UserContext } from './../context/UserProvider'
import { auth } from '../firebase'
import { CartWidget } from './CartWidget'

export const NavBar = () => {
	const { user } = useContext(UserContext)

	const [open, setOpen] = useState(false)

	const navigation = {
		pages: [
			{ name: 'Home', href: '/' },
			{ name: 'Products', href: '/products' },
		],
		user: [{ name: 'Orders', href: '/orders' }],
		admin: [{ name: 'Admin', href: '/admin' }],
	}

	return (
		<div className="bg-white">
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 lg:hidden"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
								<div className="flex px-4 pt-5 pb-2">
									<button
										type="button"
										className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">
											Close menu
										</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>

								<div className="space-y-6 py-6 px-4">
									{navigation.pages.map(page => (
										<div
											key={page.name}
											className="flow-root"
										>
											<NavLink
												to={page.href}
												className="-m-2 block p-2 font-medium text-gray-900"
												onClick={() => setOpen(false)}
											>
												{page.name}
											</NavLink>
										</div>
									))}
								</div>

								{!user ? (
									<>
										<div className="border-t mx-4"></div>

										<div className="space-y-6 py-6 px-4">
											<div className="flow-root">
												<NavLink
													to="/login"
													className="-m-2 block p-2 font-medium text-gray-900"
													onClick={() =>
														setOpen(false)
													}
												>
													Log in
												</NavLink>
											</div>
											<div className="flow-root">
												<NavLink
													to="/signup"
													className="-m-2 block p-2 font-medium text-gray-900"
													onClick={() =>
														setOpen(false)
													}
												>
													Sign up
												</NavLink>
											</div>
										</div>
									</>
								) : null}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-white">
				<nav
					aria-label="Top"
					className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b">
						<div className="flex h-16 items-center justify-between">
							<button
								type="button"
								className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="sr-only">Open menu</span>
								<Bars3Icon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>

							<div className="flex ml-4 lg:ml-0">
								<NavLink
									to="/"
									className="flex items-center gap-2"
								>
									<span className="sr-only">Store App</span>
									{/* <img
										className="h-8 w-auto"
										src="https://cdn-icons-png.flaticon.com/512/2682/2682482.png"
										alt=""
									/> */}
									<span className="block font-medium text-xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
										Store
										<span className="font-semibold">
											App
										</span>
									</span>
								</NavLink>
							</div>

							<div className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{navigation.pages.map(page => (
										<NavLink
											key={page.name}
											to={page.href}
											className="flex items-center text-gray-700 hover:text-gray-800"
										>
											{page.name}
										</NavLink>
									))}
								</div>
							</div>

							<div className="ml-auto flex items-center">
								{user ? (
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
												<span className="sr-only">
													Open user menu
												</span>
												<img
													className="h-8 w-8 rounded-full"
													src="https://api.lorem.space/image/face?hash=33791"
													alt="Image profile"
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												{user
													? navigation.user.map(
															page => (
																<Menu.Item
																	key={
																		page.name
																	}
																>
																	{({
																		active,
																	}) => (
																		<NavLink
																			to={
																				page.href
																			}
																			className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
																		>
																			{
																				page.name
																			}
																		</NavLink>
																	)}
																</Menu.Item>
															)
													  )
													: null}
												{user?.role === 'admin'
													? navigation.admin.map(
															page => (
																<Menu.Item
																	key={
																		page.name
																	}
																>
																	{({
																		active,
																	}) => (
																		<NavLink
																			to={
																				page.href
																			}
																			className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
																		>
																			{
																				page.name
																			}
																		</NavLink>
																	)}
																</Menu.Item>
															)
													  )
													: null}
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() =>
																signOut(auth)
															}
															className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
														>
															Log out
														</button>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								) : (
									<div className="hidden ml-auto lg:flex items-center">
										<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
											<NavLink
												to="/login"
												className="text-gray-700 hover:text-gray-800"
											>
												Log in
											</NavLink>
											<NavLink
												to="/signup"
												className="rounded-full px-4 py-2 text-gray-50 hover:text-white bg-gradient-to-br from-primary to-secondary shadow-md shadow-secondary/10"
											>
												Sign up
											</NavLink>
										</div>
									</div>
								)}

								<CartWidget />
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
