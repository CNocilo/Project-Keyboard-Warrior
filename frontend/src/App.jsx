import { 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { AuthProvider } from './components/AuthContext';


const router = createBrowserRouter (
    createRoutesFromElements(
        <Route path='/' element={ <Layout /> }>
            <Route index element={ <HomePage /> }/>
            <Route path='/about' element={ <AboutPage /> }/>
            <Route path='/leaderboard' element={ <LeaderboardPage /> }/>
            <Route path='/login' element={ <LoginPage /> }/>
            <Route path='/register' element={ <RegisterPage /> }/>
        </Route>
    )
)

function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    )
}

export default App
