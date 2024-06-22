import './styles.css'

import { ProductSkinCS } from '@/types/entities/productSkinCs'
import ItemCard from '../ItemCard'


const Catalog = () => {

    const fetchedSkinsFromApi: [ProductSkinCS] = [
        {
            id: 1,
            name: 'Neon Rider',
            category: 'Rifles',
            weapon: 'AK-47',
            statTrak: true,
            floatShort: 'MW',
            floatFull: 0.09875,
            itemImgUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJM6dO4q5KCk_LmDLfYkWNFppYojOvFpdj20QKxqEY_a2r1cIadIwdoMl3Q8lG9l7y7g5C5u5nIznJ9-n51YP1b6DQ',
            stickerImgUrlArray: [
                {
                    id: 1,
                    imgUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/stickers/emskatowice2014/titan_holo.bfea30263342666a115079ef5eba50949eb3c301.png',
                },
                {
                    id: 2,
                    imgUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/stickers/emskatowice2014/titan_holo.bfea30263342666a115079ef5eba50949eb3c301.png'
                }
            ],
            discount: 22,
            price: 2389.45,
            steamPrice: 2752.73
        }
    ]

    const renderCount = 24

    const multipliedArray: ProductSkinCS[] = Array(renderCount).fill({ ...fetchedSkinsFromApi[0] })

    return (

        <div className='catalog-main-container'>

            <div className='item-container'>

                {multipliedArray.map(skin => {
                    return (
                        <ItemCard itemProps={skin} key={skin.id} />
                    )
                })

                }

            </div>

        </div>

    )

}

export default Catalog