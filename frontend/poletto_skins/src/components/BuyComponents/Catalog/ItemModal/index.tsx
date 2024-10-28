import AddItemButton from '@/components/AddItemButton'
import FloatBar from '@/components/FloatBar'
import { useCart } from '@/hooks/useCart'
import { Listing } from '@/types/entities/listing'
import { SteamSticker } from '@/types/entities/steam-item'
import { AddShoppingCartRounded, Close, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Divider, Link, Stack, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './styles.scss'

type ListingModalProps = {
    listing: Listing
    open: boolean
    handleClose: () => void
    itemAction: () => void
}

const ListingModal = ({ listing, open, handleClose, itemAction }: ListingModalProps) => {

    const { isListingInCart } = useCart()

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            disableEnforceFocus
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1150px',
                bgcolor: '#282633',
                borderRadius: '.5rem',
                boxShadow: 24,
                p: 4,
                outline: 0
            }}>
                <div className='item-modal-content'>
                    <div className='item-modal-header'>

                        <div className='item-title'>

                            {listing?.item.quality == 9 &&
                                <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    color={'#CF6A32'}
                                >
                                    {listing?.item.qualityName}&nbsp;
                                </Typography>
                            }

                            <Typography
                                variant='h5'
                                fontWeight={600}
                            >
                                {`${listing?.item.fullItemName.replace('StatTrak™', '')} ${listing?.item.itemName == '-' ? '| Vanilla' : ''}`}
                            </Typography>

                        </div>

                        <div
                            onClick={handleClose}
                            className='close-button'>
                            <Close />
                        </div>

                    </div>

                    <div className='item-modal-body'>

                        <div className='item-modal-left-side'>

                            <div className='item-image'>
                                <img
                                    src={listing?.item.imageUrl}
                                    alt={listing?.item.fullItemName}
                                    loading='lazy'
                                />
                            </div>

                            <div className='item-actions'>
                                <Stack direction='row' spacing={2} justifyContent='space-between'>

                                    <Link
                                        href={listing?.item.inspectUrl}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Inspecionar <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href={'https://steamcommunity.com/market/listings/730/' + listing?.item.fullItemName}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Ver na Steam <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href={`https://youtube.com/results?search_query=${listing?.item.weaponType} ${listing?.item.itemName == '-' ? 'Vanilla' : listing?.item.itemName} - Skin Float And Wear Preview`}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Highlight <FaExternalLinkAlt />
                                    </Link>

                                </Stack>
                            </div>

                            {listing?.item.weaponType.toLowerCase() !== 'sticker' && listing?.item.stickers &&

                                <Stack
                                    direction='row'
                                    marginTop={2}
                                    spacing={2}
                                    display={'grid'}
                                    gridTemplateColumns={'repeat(4, 1fr)'}
                                    height={'90px'}
                                >
                                    {listing?.item.stickers.slice(0, 4).map((sticker: SteamSticker, index: number) => { //TODO: slicing 4 stickers
                                        return (
                                            <Tooltip
                                                key={sticker.stickerId + '-' + index}
                                                placement='top'
                                                arrow
                                                title={
                                                    <Typography noWrap minWidth='fit-content'>
                                                        {sticker.name}
                                                    </Typography>
                                                }>
                                                <div className='item-sticker'>
                                                    <img
                                                        src={sticker.imageUrl}
                                                        alt={sticker.name}
                                                        loading='lazy'
                                                    />
                                                    <Typography>
                                                        R${9999 /*TODO: mocking*/}
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        )
                                    })}
                                </Stack>

                            }

                        </div>

                        <div className='item-modal-right-side'>

                            <div className='item-details-box float'>

                                <div className='float-container'>
                                    <FloatBar floatValue={listing?.item.floatValue * 100} />
                                </div>


                                <div className='item-info'>

                                    <div className='item-field'>
                                        <Typography>
                                            Float
                                        </Typography>
                                    </div>

                                    <div className='item-value'>
                                        <Typography>
                                            {listing?.item.floatValue}
                                        </Typography>
                                    </div>

                                </div>

                                <Divider sx={{ bgcolor: '#BCBCC2' }} />

                                <div className='item-info'>

                                    <div className='item-field'>
                                        <Typography>
                                            Rarity
                                        </Typography>
                                        <Typography>
                                            Pattern
                                        </Typography>
                                    </div>


                                    <div className='item-value'>
                                        <Typography>
                                            {listing?.item.rarityName}
                                        </Typography>
                                        <Typography>
                                            {listing?.item.paintSeed}
                                        </Typography>
                                    </div>

                                </div>

                            </div>

                            <div className='item-details-box price'>

                                <div className='item-info'>

                                    <div className='item-field'>
                                        <Typography>
                                            Steam Price
                                        </Typography>
                                        <Typography>
                                            Recommended Price
                                        </Typography>
                                    </div>

                                    <div className='item-value'>
                                        <Typography>
                                            {listing?.listingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </Typography>
                                        <Typography>
                                            {/* TODO: same price && mocked recommended price */}
                                            {(listing?.listingPrice / 100 * 85).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </Typography>
                                    </div>

                                </div>

                                <Divider sx={{ bgcolor: '#BCBCC2' }} />

                                <div className='item-info'>

                                    <div className='item-field'>
                                        <Typography variant='h6'>
                                            Current price
                                        </Typography>
                                    </div>

                                    <div className='item-value'>
                                        <Typography variant='h6'>
                                        {listing?.listingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </Typography>
                                    </div>

                                </div>

                                <div className='add-cart-container'>
                                    <AddItemButton
                                        isItemInCart={isListingInCart(listing.id)}
                                        onClick={itemAction}
                                        isHovered={true}
                                    >
                                        {isListingInCart(listing.id)
                                            ? <RemoveShoppingCartRounded />
                                            : <AddShoppingCartRounded />
                                        }
                                    </AddItemButton>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </Box >
        </Modal >

    )
}

export default ListingModal