import SideNavbar from '@/components/SideNavbar'
import { Outlet } from 'react-router-dom'
import './styles.scss'

const Home = () => {

    return (

        <div className='home-main-container'>

            <div className='left-container'>

                <SideNavbar />

            </div>

            <div className='central-container'>

                <Outlet />

            </div>

            <div className='operation-container'>

            </div>

        </div>

    )

}

export default Home