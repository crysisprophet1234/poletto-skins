import './styles.scss'

import { GloveSkin, ItemType, Sticker, WeaponSkin } from '@/types/entities/item'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import TopFilter from '../..//components/TopFilter'
import Catalog from '../../components/Catalog'
import MainFilter from '../../components/MainFilter'
import { useCart } from '../../hooks/useCart'

//MOCKS
const fetchedStickersFromApi: Sticker[] = [
    {
        id: '0770f06f-d9a5-4a0d-9954-12596bd41eb1',
        name: 'Titan',
        category: 'Stickers',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYorOxKglf2_zEfnNA7oiyx9jdzqanZb3Txj8F7cZwie3CrNTwiVbl-hdrMj30dY-VewA5fxiOrQhGIm55',
        price: 153.95,
        steamPrice: 589.72,
        discount: 74,
        rarity: 'Remarkable',
        finish: 'Holo',
        eventOrCollection: 'Katowice 2014',
        origin: 'Capsule'
    },
    {
        id: 'f0fe428a-ed24-4565-a796-d4655a885c08',
        name: 'Virtus.Pro',
        category: 'Stickers',
        imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYoLO3PxJzw-HHTjtN5dD4ktPflvP1Z-vVkG5TsJUi2eqZp4jz2Qay_hdkMW-nINPDJFI5ZFnR_0_-n7lgPHan2Q',
        price: 200.00,
        steamPrice: 650.00,
        discount: 69,
        rarity: 'Remarkable',
        finish: 'Foil',
        eventOrCollection: 'Katowice 2015',
        origin: 'Capsule'
    },
    {
        id: '35cc5927-7848-441c-aa8f-02d551744fd3',
        name: 'Natus Vincere',
        category: 'Stickers',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBRJ6JBJeibKqJwgu0vWZIjwUuIvlwNiOwaKmZLqGxjkD7pUh3OrC843w2wOy-UpqYW7yJ5jVLFH30XxDQQ',
        price: 180.00,
        steamPrice: 600.00,
        discount: 71,
        rarity: 'Remarkable',
        finish: 'Holo',
        eventOrCollection: 'Cologne 2016',
        origin: 'Capsule'
    },
    {
        id: '0582b082-52cb-423b-808c-3acdeddd30d0',
        name: 'Crown',
        category: 'Stickers',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROWEXTTOG_xJ2cUE97MgposLWsJ0lli6uRJ2sTvoqywYONkaH2Nb-Gl28G6cByiO_Hp9333QywqBE-amihOsbLJUJKMhul',
        price: 190.00,
        steamPrice: 630.00,
        discount: 65,
        rarity: 'Exotic',
        finish: 'Foil',
        eventOrCollection: 'Sticker Capsule 2',
        origin: 'Capsule'
    }
]

const fetchedWeaponSkinsFromApi: WeaponSkin[] = [
    {
        id: '5e232b24-f940-47d8-ad9d-8c776ba61629',
        name: 'Neon Rider',
        category: 'Rifles',
        subCategory: 'AK-47',
        statTrak: true,
        floatShort: 'MW',
        floatFull: 0.09875,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJM6dO4q5KCk_LmDLfYkWNFppYojOvFpdj20QKxqEY_a2r1cIadIwdoMl3Q8lG9l7y7g5C5u5nIznJ9-n51YP1b6DQ',
        stickerArray: fetchedStickersFromApi,
        discount: 22,
        price: 2389.45,
        steamPrice: 2752.73
    },
    {
        id: '4ce8f3da-2a8f-4e75-9228-6e41739b95bb',
        name: 'Dragon Lore',
        category: 'Sniper Rifles',
        subCategory: 'AWP',
        statTrak: false,
        floatShort: 'FN',
        floatFull: 0.02,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv2PrdSijAWwqkVtN272JIGdJw46YVrYqVO3xLy-gJC9u5vByCBh6ygi7WGdwUKTYdRD8A',
        stickerArray: [fetchedStickersFromApi[0], fetchedStickersFromApi[3]],
        discount: 10,
        price: 15000.00,
        steamPrice: 18000.00
    },
    {
        id: '38ee3a14-97dc-4328-b5f4-b9eba187d0aa',
        name: 'Asiimov',
        category: 'Rifles',
        subCategory: 'M4A4',
        statTrak: false,
        floatShort: 'FT',
        floatFull: 0.165,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7c2GpQ7JMg0uyYoYin2wHj-kU6YGD0cYOUcFA9YFnS_AC9xeq508K0us7XiSw0vgXM_Rw',
        stickerArray: [fetchedStickersFromApi[1], fetchedStickersFromApi[0]],
        discount: 15,
        price: 5000.00,
        steamPrice: 5500.00
    },
    {
        id: '6756535d-c686-4b04-96de-a1239d5e3643',
        name: 'Printstream',
        category: 'Rifles',
        subCategory: 'M4A1-S',
        statTrak: true,
        floatShort: 'FN',
        floatFull: 0.029,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11qa2n6dtOcIQVoMFHUqwC9wei7jcO5vZ3AzSQ1vCMls3fayxKyhh1McKUx0sfzkVMr',
        stickerArray: [],
        discount: 21,
        price: 4560.06,
        steamPrice: 5523.05
    },
    {
        id: '299f1fc7-3a9f-4381-b1b1-818417efbc03',
        name: 'Ocean Drive',
        category: 'Pistols',
        subCategory: 'Desert Eagle',
        statTrak: false,
        floatShort: 'MW',
        floatFull: 0.093,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du6kb-AnuP3O4Tdn2xZ_Ity0-qSptum3gbs_kNtZD31LdedIw5qNFHRrle3wrrs1sXpu8jNyHNhpGB8sqEwmZLd',
        stickerArray: [],
        discount: 9,
        price: 575.14,
        steamPrice: 591.70
    },
    {
        id: 'db5f59ff-22ec-43b5-9703-2840c08f0af4',
        name: 'Atheris',
        category: 'Rifles',
        subCategory: 'AWP',
        statTrak: true,
        floatShort: 'BS',
        floatFull: 0.813,
        imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5cyzhr-DkvbiKvWCkG4Gucd1jrmR9t_z2VewrkBkMTjzIdCWewBsaFuBrwW2xem7hpe9ot2Xnv5EhL7X',
        stickerArray: [],
        discount: 0,
        price: 15.38,
        steamPrice: 11.49
    }
]

const fetchedGloveSkinsFromApi: GloveSkin[] = [
    {
        id: '8f42ab8b-28a6-4bdc-9236-151dfec670e1',
        name: 'Vice',
        category: 'Gloves',
        subCategory: 'Sport Gloves',
        floatShort: 'FN',
        floatFull: 0.00521,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mJWOqOf9PbDummJW4NE_3LmYo43w31Cx-xE4ZmilJoWVdFRvNQzX_1DtlLjq15G5tJnLzCFh7j5iuyjrgJbKOg',
        price: 93994.25,
        steamPrice: 123655.08,
        discount: 24
    },
    {
        id: '3b59556a-c7ab-48c1-859c-c102b6a08dc5',
        name: 'Cobalt Skulls',
        category: 'Gloves',
        subCategory: 'Hand Wraps',
        floatShort: 'MW',
        floatFull: 0.08234,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_KilihriwvOCyveMX6Ll9pORzOrFe6xu6-hce47c_MwHZk6CRxtCrdnBDi1x9Ea-xr0fGaS1XNUvdLH77CWCR9IaxTog',
        price: 75000.00,
        steamPrice: 85000.00,
        discount: 12
    },
    {
        id: '0c241296-e707-4474-89d9-eeae4f55d54f',
        name: 'Fade ',
        category: 'Gloves',
        subCategory: 'Specialist Gloves',
        floatShort: 'FT',
        floatFull: 0.15867,
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL3Qkm5u5Mx2gv2PpdWi3QGy-BY-YW6gcI6Vc1c5Z17RqADtxe7p0Z7qtJnLnHsxuCIk52GdwUIAanvipQ',
        price: 80000.00,
        steamPrice: 90000.00,
        discount: 11
    },
    {
        id: 'bf054871-5698-4791-b060-f4a90c5d4e38',
        name: 'Shemagh Escarlate',
        category: 'Gloves',
        subCategory: 'Sport Gloves',
        floatShort: 'WW',
        floatFull: 0.41,
        imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO-m5WFk-TgPLTFnlRD7cFOh-zF_Jn4xg2xqBdlaz_1LILDI1U6MFDTrFXsyOi7jcC97pXOyydkuSRw537UnR2pwUYbvu3uoFg',
        discount: 17,
        price: 1300.15,
        steamPrice: 1570.92
    }
]

const fetchedKnifeSkinsFromApi: ItemType[] = [
    {
        id: '4f4e014a-2980-4c15-b05f-55c2ab477168',
        name: 'Fade',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlYG0kfbwNoTdn2xZ_Isn3uyTpN7zjlHt-ENsZjumcoCUJAZqaV_QqVa9xL3thsC-tZyYznIypGB8sly_Gx3i',
        price: 13959.49,
        steamPrice: 14605.79,
        discount: 4,
        category: 'Knifes',
        subCategory: 'Karambit',
        statTrak: true,
        floatShort: 'FN',
        floatFull: 0.021
    },
    {
        id: '3c7e6361-3dc2-4253-848b-90953a5c65f4',
        name: 'Crimson Web',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWZU7Mxkh6fAp9X20APgrRc5YW76I46XcwM-Mw2B_AS5kunm08Pt6Z3MnCZruSAr-z-DyMcCNLCI',
        price: 15450.00,
        steamPrice: 16000.00,
        discount: 5,
        category: 'Knifes',
        subCategory: 'M9 Bayonet',
        statTrak: false,
        floatShort: 'FT',
        floatFull: 0.159
    },
    {
        id: '74cd450f-1618-4c7f-83df-482663e443f9',
        name: 'Ultraviolet',
        imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqOfhIavdk1Rd4cJ5nqeX99zwiQftqBFpYGzwIteVcwNtZ1jW_Vbvw-bsg5G1tMiamHU2syVz-z-DyAONDlVx',
        price: 14500.00,
        steamPrice: 15000.00,
        discount: 3,
        category: 'Knifes',
        subCategory: 'Butterfly',
        statTrak: false,
        floatShort: 'MW',
        floatFull: 0.084
    }
]

const combinedArray: ItemType[] = [
    ...fetchedWeaponSkinsFromApi,
    ...fetchedStickersFromApi,
    ...fetchedGloveSkinsFromApi,
    ...fetchedKnifeSkinsFromApi
]

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

    const { addToCart, removeFromCart, isItemInCart } = useCart()

    const handleAddCartButtonClick = (item: ItemType) => {
        if (isItemInCart(item.id)) {
            removeFromCart(item.id)
        } else {
            addToCart(item)
        }
    }

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

        await response.data

        setItems(combinedArray)
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
                    <Catalog items={items} itemAction={handleAddCartButtonClick} />
                </div>

            </div>

        </div>

    )

}

export default Buy