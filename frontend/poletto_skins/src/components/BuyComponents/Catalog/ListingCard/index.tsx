import AddItemButton from '@/components/AddItemButton'
import { useCart } from '@/hooks/useCart'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaSteam } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'
import './styles.scss'
import { Listing } from '@/types/entities/listing'
import { SteamSticker } from '@/types/entities/steam-item'

type ListingCardProps = {
    listingProps: Listing
    openModal: () => void
    listingAction: () => void
}

const ListingCard = ({ listingProps, openModal, listingAction }: ListingCardProps) => {

    const { isListingInCart } = useCart()

    const [listing, setListing] = useState<Listing>()

    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        setListing(listingProps)
    }, [listingProps])

    if (!listing) return

    return (

        <div
            className='item-card-main-container'
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className='item-info-container'>

                {listing?.item.weaponType.toLowerCase() == 'sticker'
                    ? (
                        <>
                            <span className='skin-name'>
                                {listing?.item.stickers[0].name}
                            </span>

                            <span className='category'>
                                {listing?.item.weaponType}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='skin-name'>
                                {listing?.item.itemName == '-' ? 'Vanilla' : listing?.item.itemName}
                            </span>

                            <span className='category'>
                                {listing?.item.weaponType /*TODO: subcategory?*/}
                            </span>

                            <div className='additional-info'>

                                {listing?.item.qualityName.toLowerCase().includes('stattrak') && (
                                    <span className='stat-trak'>ST</span>
                                )}

                                <span className='float-short'>
                                    {itemWearAbbreviator(listing?.item.wearName as WearName)}
                                </span>

                                <Tooltip title={
                                    <Typography noWrap minWidth='fit-content'>
                                        {listing?.item.floatValue}
                                    </Typography>
                                }>
                                    <span className='float-full'>
                                        {listing?.item.floatValue.toFixed(4)}
                                    </span>
                                </Tooltip>

                            </div>
                        </>
                    )
                }

            </div>

            <div className='item-picture-container'>

                <div className='skin-image'>
                    <img src={listing?.item?.imageUrl} alt='skin-image' loading='lazy' />
                </div>

                {listing?.item.weaponType.toLowerCase() !== 'sticker' && listing?.item.stickers && (
                    <div className='sticker-stack'>

                    {listing?.item.stickers.slice(0, 4).map((sticker: SteamSticker, index: number) => {
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

                    {listing?.discount > 0 &&
                        <div className='discount'>
                            <span>{`-${listing.discount}%`}</span>
                        </div>
                    }

                    <div className='price'>
                        <span>{listing?.listingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>

                    <div className='steam-price'>
                        <FaSteam />
                        {/*TODO: same price */}
                        <span>{listing?.steamPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>

                </div>

                <div className='favorite-container' >

                    <div className='favorite' onClick={(e) => { e.stopPropagation() }}>
                        <MdFavorite />
                    </div>

                </div>

                <div className='add-cart-container' onClick={(e) => e.stopPropagation()}>
                    <AddItemButton
                        isItemInCart={isListingInCart(listing!.id)}
                        onClick={listingAction}
                        isHovered={isHovered}
                    >
                        {isListingInCart(listing!.id)
                            ? <RemoveShoppingCartRounded />
                            : <AddShoppingCartRounded />
                        }
                    </AddItemButton>
                </div>

            </div>

        </div >

    )
}

export default ListingCard