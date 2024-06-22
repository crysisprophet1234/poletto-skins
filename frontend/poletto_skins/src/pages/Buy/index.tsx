import Catalog from '../../components/Catalog'
import './styles.css'

const Buy = () => {

    return (

        <div className='buy-main-container'>

            <div className='main-filter'>
                LEFT-FILTER
            </div>

            <div className='buy-main-area'>

                <div className='top-filter'>
                    TOP-FILTER
                </div>

                <div className='catalog-container'>
                    <Catalog />
                </div>

            </div>

        </div>

    )

}

export default Buy