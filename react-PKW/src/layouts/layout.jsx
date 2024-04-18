import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
        <Logo />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout