import './styles.css'

import { Sticker, WeaponSkin } from '@/types/entities/item'
import ItemCard from '../ItemCard'


const Catalog = () => {

    const fetchedStickersFromApi: Sticker[] = [
        {
            id: 1,
            name: 'Titan',
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
            id: 2,
            name: 'Virtus.Pro',
            imageUrl: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYoLO3PxJzw-HHTjtN5dD4ktPflvP1Z-vVkG5TsJUi2eqZp4jz2Qay_hdkMW-nINPDJFI5ZFnR_0_-n7lgPHan2Q/360fx360f',
            price: 200.00,
            steamPrice: 650.00,
            discount: 69,
            rarity: 'Remarkable',
            finish: 'Foil',
            eventOrCollection: 'Katowice 2015',
            origin: 'Capsule'
        }
    ]

    const fetchedSkinsFromApi: WeaponSkin[] = [
        {
            id: 1,
            name: 'Neon Rider',
            category: 'Rifles',
            weapon: 'AK-47',
            statTrak: true,
            floatShort: 'MW',
            floatFull: 0.09875,
            imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJM6dO4q5KCk_LmDLfYkWNFppYojOvFpdj20QKxqEY_a2r1cIadIwdoMl3Q8lG9l7y7g5C5u5nIznJ9-n51YP1b6DQ',
            stickerArray: fetchedStickersFromApi,
            discount: 22,
            price: 2389.45,
            steamPrice: 2752.73
        }
    ]

    const renderCount = 24

    const multipliedArray: WeaponSkin[] = Array(renderCount).fill({ ...fetchedSkinsFromApi[0] })

    return (

        <div className='catalog-main-container'>

            <div className='item-container'>

                {multipliedArray.map((skin, index) => {
                    return (
                        <ItemCard itemProps={skin} key={index} />
                    )
                })

                }

            </div>

        </div>

    )

}

export default Catalog