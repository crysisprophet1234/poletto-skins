import AddCartButton from '@/components/AddCartButton'
import { useCart } from '@/hooks/useCart'
import { MarketItem } from '@/types/entities/steam-item'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import { Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaSteam } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'
import './styles.scss'

type ItemCardProps = {
    itemProps: MarketItem
    openModal: () => void
    itemAction: () => void
}

const ItemCard = ({ itemProps, openModal, itemAction }: ItemCardProps) => {

    const { isItemInCart } = useCart()

    const [item, setItem] = useState<MarketItem | null>(null)

    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        setItem(itemProps)
    }, [itemProps])

    if (!item) {
        return
    }

    return (

        <div
            className='item-card-main-container'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className='item-info-container'>

                {item.weaponType.toLowerCase() == 'sticker'
                    ? (
                        <>
                            <span className='skin-name'>
                                {item.stickers[0].name}
                            </span>

                            <span className='category'>
                                {item.weaponType}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='skin-name'>
                                {item.itemName == '-' ? 'Vanilla' : item.itemName}
                            </span>

                            <span className='category'>
                                {item.weaponType /*TODO: subcategory?*/}
                            </span>

                            <div className='additional-info'>

                                {item.qualityName.toLowerCase().includes('stattrak') && (
                                    <span className='stat-trak'>ST</span>
                                )}

                                <span className='float-short'>
                                    {itemWearAbbreviator(item.wearName as WearName)}
                                </span>

                                <Tooltip title={
                                    <Typography noWrap minWidth='fit-content'>
                                        {item.floatValue}
                                    </Typography>
                                }>
                                    <span className='float-full'>
                                        {item.floatValue.toFixed(4)}
                                    </span>
                                </Tooltip>

                            </div>
                        </>
                    )
                }

            </div>

            <div className='item-picture-container'>

                <div className='skin-image'>
                    <img src={item?.imageUrl} alt='skin-image' loading='lazy' />
                </div>

                {item.weaponType.toLowerCase() !== 'sticker' && (
                    <div className='sticker-stack'>

                        {item.stickers.slice(0, 4).map((sticker, index) => { //TODO: slicing 4 stickers
                            return (
                                <div className='sticker' key={sticker.stickerId + '-' + index}>
                                    <img src={sticker.imageUrl} alt={sticker.name} loading='lazy' />
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
                            <span>{`-${item.discount.toFixed(2)}%`}</span>
                        </div>
                    }

                    <div className='price'>
                        <span>{`R$ ${item?.price.toFixed(2)}`}</span>
                    </div>

                    <div className='steam-price'>
                        <FaSteam />
                        <span>{`R$ ${item?.steamPrice.toFixed(2)}`}</span>
                    </div>

                </div>

                <div className='favorite-container' >

                    <div className='favorite' onClick={(e) => { e.stopPropagation() }}>
                        <MdFavorite />
                    </div>

                </div>

                <div className='add-cart-container' onClick={(e) => e.stopPropagation()}>
                    <AddCartButton
                        isItemInCart={isItemInCart(item.assetId)}
                        onClick={itemAction}
                        isHovered={isHovered}
                    />
                </div>

            </div>

        </div >

    )
}

export default ItemCard