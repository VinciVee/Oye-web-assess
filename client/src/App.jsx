// Import npm packages
import { Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/auth/Dashboard';
import ProductsPage from './pages/product/ProductsPage';
import GithubMenu from './pages/apis/GithubMenu';
import NotFound from './pages/NotFound';

// Import components
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* PRODUCTS */}
        <Route path='store/products' element={<ProductsPage />} />
        {/* AUTHENTICATION */}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='dashboard' element={<Dashboard />} />
        {/* GITHUB */}
        <Route path='github' element={<GithubMenu />} />
        {/* ERROR PAGES */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
