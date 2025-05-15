import './App.css'
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom'
import Login from './pages/login/login';
import Layout from './component/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import AddProduct from './pages/product/add-product/AddProduct';
import { useSelector } from 'react-redux';
import './component/i18n/i18nConfig'
function App() {
const isLoggedIn = useSelector((state:any)=> state.auth.isLoggedIn);
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={isLoggedIn ? <Navigate to={'/dashboard'} />: <Login />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard  />: <Navigate to="/" />} />
        <Route path='/add-product' element={isLoggedIn ? <AddProduct  />: <Navigate to="/" />} />add-product
        </Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
