import './styles.scss'

import { ItemType } from '@/types/entities/item'
import { useEffect, useState } from 'react'
import { FaSteam } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'
import AddCartButton from '../AddCartButton'

type ItemCardProps = {
    itemProps: ItemType
    openModal: () => void
}

const ItemCard = ({ itemProps, openModal }: ItemCardProps) => {

    const [item, setItem] = useState<ItemType | null>(null)

    useEffect(() => {
        setItem(itemProps)
    }, [itemProps])

    if (!item) {
        return
    }

    return (
        <div className='item-card-main-container' onClick={openModal}>

            <div className='item-info-container'>

                <span className='skin-name'>
                    {'finish' in item ? `${item.name} (${item.finish})` : item.name}
                </span>

                {'category' in item && 'subCategory' in item ?
                    <span className='category'>
                        {`${item.category} | ${item.subCategory}`}
                    </span>
                    :
                    <span className='category'>
                        {`${item.category}`}
                    </span>
                }

                <div className='additional-info'>

                    {'statTrak' in item && item.statTrak == true && (
                        <span className='stat-trak'>ST</span>
                    )}

                    {'floatShort' in item && (
                        <span className='float-short'>
                            {item?.floatShort}
                        </span>
                    )}

                    {'floatFull' in item && (
                        <span className='float-full'>
                            {item?.floatFull}
                        </span>
                    )}

                </div>

            </div>

            <div className='item-picture-container'>

                <div className='skin-image'>
                    <img src={item?.imageUrl} alt='skin-image' loading='lazy' />
                </div>

                {'stickerArray' in item && (
                    <div className='sticker-stack'>

                        {item.stickerArray.map((sticker) => {
                            return (
                                <div className='sticker' key={sticker.id}>
                                    <img src={sticker.imageUrl} alt='sticker' loading='lazy' />
                                </div>
                            )
                        })}

                    </div>
                )}

            </div>

            <div className='item-bottom-container'>

                <div className='price-container'>

                    {item?.discount && item.discount > 0 &&
                        <div className='discount'>
                            <span>{`-${item.discount}%`}</span>
                        </div>
                    }

                    <div className='price'>
                        <span>{`R$ ${item?.price}`}</span>
                    </div>

                    <div className='steam-price'>
                        <FaSteam />
                        <span>{`R$ ${item?.steamPrice}`}</span>
                    </div>

                </div>

                <div className='favorite-container' >

                    <div className='favorite' onClick={(e) => { e.stopPropagation() }}>
                        <MdFavorite />
                    </div>

                </div>

                <div className='add-cart-container'>
                    <AddCartButton onClick={(e) => { e.stopPropagation() }} />
                </div>

            </div>

        </div>
    )
}

export default ItemCard