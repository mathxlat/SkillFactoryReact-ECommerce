import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './context/UserProvider'
import { ProductsProvider } from './context/ProductsProvider'
import { CategoriesProvider } from './context/CategoriesProvider'
import App from './App'

import './styles/index.css'
import { CartProvider } from './context/CartProvider'
import { OrdersProvider } from './context/OrdersProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<CategoriesProvider>
				<ProductsProvider>
					<OrdersProvider>
						<CartProvider>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</CartProvider>
					</OrdersProvider>
				</ProductsProvider>
			</CategoriesProvider>
		</UserProvider>
	</React.StrictMode>
)
