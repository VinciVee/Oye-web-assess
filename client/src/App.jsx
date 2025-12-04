// Import npm packages
import { Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/auth/Dashboard';
import ProductsPage from './pages/product/ProductsPage';
import NotFound from './pages/NotFound';
import PrivateRoutes from './components/layout/PrivateRoutes';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import ProductDetail from './pages/product/ProductDetail';
import OnSalePage from './pages/product/OnSalePage';

// Import components
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* PRODUCTS: /store/... */}
        <Route path="store">
          <Route path='products' element={<ProductsPage />} />
          <Route path='sales' element={<OnSalePage />} />
          <Route path='product'>
            <Route path=':id' element={<ProductDetail />} />
            <Route element={<PrivateRoutes />} >
              <Route path='add' element={<AddProduct />} />
              <Route path='edit/:id' element={<EditProduct />} />
            </Route>
          </Route>
        </Route>

        {/* AUTHENTICATION */}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />

        {/* PRIVATE AUTH AREA */}
        <Route element={<PrivateRoutes />} >
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

        {/* ERROR PAGES */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
