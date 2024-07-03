import './styles.scss'

import { ItemType } from '@/types/entities/item'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import TopFilter from '../..//components/TopFilter'
import Catalog from '../../components/Catalog'
import MainFilter from '../../components/MainFilter'

type FilterData = {
    minPrice?: string,
    maxPrice?: string,
    minFloat?: string,
    maxFloat?: string,
    category?: string[],
    others?: string[],
    query?: string,
    sort?: string,
    favorite?: boolean
}

const Buy = () => {

    const [items, setItems] = useState<ItemType[]>([])

    const [filterData, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const sendApiRequest = useCallback(async () => {

        if (!filterData) return

        //testing only
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: filterData
        })

        const data = await response.data
        setItems(data)
    }, [filterData])

    useEffect(() => {
        sendApiRequest()
    }, [sendApiRequest])

    return (

        <div className='buy-main-container'>

            <div className='main-filter'>
                <MainFilter onFilterChange={handleFilterChange} />
            </div>

            <div className='buy-main-area'>

                <div className='top-filter'>
                    <TopFilter onFilterChange={handleFilterChange} />
                </div>

                <div className='catalog-container'>
                    <Catalog data={items} />
                </div>

            </div>

        </div>

    )

}

export default Buy