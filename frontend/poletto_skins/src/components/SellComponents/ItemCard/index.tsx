import AddItemButton from '@/components/AddItemButton'
import { useSell } from '@/hooks/useSell'
import { MarketItem, SteamSticker } from '@/types/entities/steam-item'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import { SellRounded } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type ItemCardProps = {
    itemProps: MarketItem
    openModal: () => void
    itemAction: () => void
}

const ItemCard = ({ itemProps, openModal, itemAction }: ItemCardProps) => {

    const { isItemInSellList } = useSell()

    const [marketItem, setMarketItem] = useState<MarketItem>()

    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        setMarketItem(itemProps)
    }, [itemProps])

    if (!marketItem) return

    return (

        <div
            className='item-card-main-container'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className='item-info-container'>

                {marketItem?.item.weaponType.toLowerCase() == 'sticker'
                    ? (
                        <>
                            <span className='skin-name'>
                                {marketItem?.item.stickers[0].name}
                            </span>

                            <span className='category'>
                                {marketItem?.item.weaponType}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='skin-name'>
                                {marketItem?.item.itemName == '-' 
                                    ? 'Vanilla' 
                                    : marketItem?.item.itemName
                                }
                            </span>

                            <span className='category'>
                                {marketItem?.item.weaponType /*TODO: subcategory?*/}
                            </span>

                            <div className='additional-info'>

                                {marketItem?.item.qualityName.toLowerCase().includes('stattrak') && (
                                    <span className='stat-trak'>ST</span>
                                )}

                                <span className='float-short'>
                                    {itemWearAbbreviator(marketItem?.item.wearName as WearName)}
                                </span>

                                <Tooltip title={
                                    <Typography noWrap minWidth='fit-content'>
                                        {marketItem?.item.floatValue}
                                    </Typography>
                                }>
                                    <span className='float-full'>
                                        {marketItem?.item.floatValue.toFixed(4)}
                                    </span>
                                </Tooltip>

                            </div>
                        </>
                    )
                }

            </div>

            <div className='item-picture-container'>

                <div className='skin-image'>
                    <img src={marketItem?.item?.imageUrl} alt='skin-image' loading='lazy' />
                </div>

                {marketItem?.item.weaponType.toLowerCase() !== 'sticker' && (
                    <div className='sticker-stack'>

                        {marketItem?.item.stickers.slice(0, 4).map((sticker: SteamSticker) => { //TODO: slicing 4 stickers
                            return (
                                <div className='sticker' key={sticker.codename}>
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
                        <span>{marketItem?.price?.lowestPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>

                </div>

                <div className='add-cart-container' onClick={(e) => e.stopPropagation()}>
                    <AddItemButton
                        isItemInCart={isItemInSellList(marketItem?.item.assetId)}
                        onClick={itemAction}
                        isHovered={isHovered}
                    >
                        <SellRounded />
                    </AddItemButton>
                </div>

            </div>

        </div >

    )

}

export default ItemCard