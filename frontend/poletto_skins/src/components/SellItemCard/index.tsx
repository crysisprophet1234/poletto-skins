import { useSell } from '@/hooks/useSell'
import { MarketItem } from '@/types/entities/steam-item'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import { SellRounded } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AddCartButton from '../AddCartButton'

type SellItemCardProps = {
    sellItemProps: MarketItem
    openModal: () => void
    sellItemAction: () => void
}

const SellItemCard = ({ sellItemProps, openModal, sellItemAction }: SellItemCardProps) => {

    const { isItemInSellList } = useSell()

    const [item, setItem] = useState<MarketItem | null>(null)

    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        setItem(sellItemProps)
    }, [sellItemProps])

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

                    <div className='price'>
                        <span>{item?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>

                </div>

                <div className='add-cart-container' onClick={(e) => e.stopPropagation()}>
                    <AddCartButton
                        isItemInCart={isItemInSellList(item.assetId)}
                        onClick={sellItemAction}
                        isHovered={isHovered}
                    >
                        <SellRounded />
                    </AddCartButton>
                </div>

            </div>

        </div >

    )

}

export default SellItemCard