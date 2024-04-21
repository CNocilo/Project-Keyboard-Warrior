import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';


const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={ <Layout /> }>
      <Route index element={ <HomePage /> }/>
      <Route path='/about' element={ <AboutPage /> }/>
      <Route path='/leaderboard' element={ <LeaderboardPage /> }/>
      <Route path='/login' element={ <LoginPage /> }/>
      
      
      
    </Route>
  )
)

function App() {
  return (
      <>
        <RouterProvider router={router} />
      </>
  )
}

export default App
