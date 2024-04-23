import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
      <section className="bg-cyan-700">
        <Logo />
        <Navbar />
      </section>
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout