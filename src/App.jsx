import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

import { NavBar } from './components/NavBar'
import { ItemListContainer } from './components/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer'
import { OrderList } from './components/OrderList'
import { OrderDetail } from './components/OrderDetail'
import { CartItemListContainer } from './components/CartItemListContainer'
import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { Checkout } from './components/Checkout'
import { Admin } from './components/Admin'
import { ProductForm } from './components/ProductForm'
import { CategoryForm } from './components/CategoryForm'
import { Footer } from './components/Footer'
import { Home } from './components/Home'

import { UserContext } from './context/UserProvider'
import { CartContext } from './context/CartProvider'

function App() {
	const { user } = useContext(UserContext)
	const { cart } = useContext(CartContext)

	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<ItemListContainer />} />
				<Route path="/products/:id" element={<ItemDetailContainer />} />
				<Route path="/cart" element={<CartItemListContainer />} />
				<Route
					element={
						<ProtectedRoute isAllowed={!!user && cart.length > 0} />
					}
				>
					<Route path="/checkout" element={<Checkout />} />
				</Route>
				<Route element={<ProtectedRoute isAllowed={!user} />}>
					<Route path="/login" element={<LogIn />} />
					<Route path="/signup" element={<SignUp />} />
				</Route>
				<Route element={<ProtectedRoute isAllowed={!!user} />}>
					<Route path="/orders" element={<OrderList />} />
					<Route path="/orders/:id" element={<OrderDetail />} />
				</Route>
				<Route
					element={
						<ProtectedRoute isAllowed={user?.role === 'admin'} />
					}
				>
					<Route path="/admin" element={<Admin />} />
					<Route path="/add-product" element={<ProductForm />} />
					<Route
						path="/update-product/:id"
						element={<ProductForm />}
					/>
					<Route path="/add-category" element={<CategoryForm />} />
					<Route
						path="/update-category/:id"
						element={<CategoryForm />}
					/>
				</Route>
				<Route path="*" element={<Home />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
