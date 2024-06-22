import { useEffect, useState } from 'react'
import './styles.css'

import { WeaponSkin } from '@/types/entities/item'
import { FaSteam } from "react-icons/fa6"
import { HiShoppingCart } from 'react-icons/hi'
import { MdFavorite } from 'react-icons/md'

interface ItemCardProps {
    itemProps: WeaponSkin
}

const ItemCard = ({ itemProps }: ItemCardProps) => {

    const [item, setItem] = useState<WeaponSkin>()

    useEffect(() => {

        console.log('initializing itemProps')
        setItem(itemProps)

    }, [itemProps])

    return (
        <div className='item-card-main-container'>

            <div className='item-info-container'>
                <span className='skin-name'>{item?.name}</span>
                <span className='category'>{item?.category} | {item?.weapon}</span>
                <div className='additional-info'>
                    {item?.statTrak &&
                        <span className='stat-trak'>ST</span>
                    }
                    <span className='float-short'>{item?.floatShort}</span>
                    <span className='float-full'>{item?.floatFull}</span>
                </div>
            </div>

            <div className='item-picture-container'>

                <div className='skin-image'>
                    <img src={item?.imageUrl} alt='skin-image' />
                </div>

                <div className='sticker-stack'>

                    {item?.stickerArray.map(sticker => {
                        return (
                            <div className='sticker'>
                                <img src={sticker.imageUrl} alt='sticker' key={sticker.id} />
                            </div>
                        )
                    })}

                </div>

            </div>

            <div className='item-bottom-container'>

                <div className='price-container'>

                    {item?.discount && item.discount > 0 &&
                        <div className='discount'>
                            <span>-{item.discount}%</span>
                        </div>
                    }

                    <div className='price'>
                        <span>R$ {item?.price}</span>
                    </div>

                    <div className='steam-price'>
                        <FaSteam />
                        <span>R$ {item?.steamPrice}</span>
                    </div>

                </div>

                <div className='favorite-container'>

                    <div className='favorite'>
                        <MdFavorite />
                    </div>

                </div>

                <div className='add-cart-container'>
                    <div className='add-cart'>
                        <HiShoppingCart />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ItemCard