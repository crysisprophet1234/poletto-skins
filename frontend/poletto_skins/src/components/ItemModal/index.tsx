import AddCartButton from '@/components/AddCartButton'
import FloatBar from '@/components/FloatBar'
import { useCart } from '@/hooks/useCart'
import { MarketItem } from '@/types/entities/steam-item'
import { AddShoppingCartRounded, Close, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Divider, Link, Stack, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './styles.scss'

type ItemModalProps = {
    item: MarketItem
    open: boolean
    handleClose: () => void
    itemAction: () => void
}

const ItemModal = ({ item, open, handleClose, itemAction }: ItemModalProps) => {

    const { isItemInCart } = useCart()

    if (!item) return

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

                            {item.quality == 9 &&
                                <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    color={'#CF6A32'}
                                >
                                    {item.qualityName}&nbsp;
                                </Typography>
                            }

                            <Typography
                                variant='h5'
                                fontWeight={600}
                            >
                                {`${item.fullItemName.replace('StatTrak™', '')} ${item.itemName == '-' ? '| Vanilla' : ''}`}
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
                                    src={item.imageUrl}
                                    alt={item.fullItemName}
                                    loading='lazy'
                                />
                            </div>

                            <div className='item-actions'>
                                <Stack direction='row' spacing={2} justifyContent='space-between'>

                                    <Link
                                        href={item.inspectUrl}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Inspecionar <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href={'https://steamcommunity.com/market/listings/730/' + item.fullItemName}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Ver na Steam <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href={`https://youtube.com/results?search_query=${item.weaponType} ${item.itemName == '-' ? 'Vanilla' : item.itemName} - Skin Float And Wear Preview`}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Highlight <FaExternalLinkAlt />
                                    </Link>

                                </Stack>
                            </div>

                            {item.weaponType.toLowerCase() !== 'sticker' && item.stickers.length > 0 &&

                                <Stack
                                    direction='row'
                                    marginTop={2}
                                    spacing={2}
                                    display={'grid'}
                                    gridTemplateColumns={'repeat(4, 1fr)'}
                                    height={'90px'}
                                >
                                    {item.stickers.slice(0, 4).map((sticker, index) => { //TODO: slicing 4 stickers
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
                                    <FloatBar floatValue={item.floatValue * 100} />
                                </div>


                                <div className='item-info'>

                                    <div className='item-field'>
                                        <Typography>
                                            Float
                                        </Typography>
                                    </div>

                                    <div className='item-value'>
                                        <Typography>
                                            {item.floatValue}
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
                                            {item.rarityName}
                                        </Typography>
                                        <Typography>
                                            {item.paintSeed}
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
                                            R$ {item.steamPrice.toFixed(2)}
                                        </Typography>
                                        <Typography>
                                            R$ {(item.steamPrice / 100 * 85).toFixed(2)}
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
                                            R$ {item.price.toFixed(2)}
                                        </Typography>
                                    </div>

                                </div>

                                <div className='add-cart-container'>
                                    <AddCartButton
                                        isItemInCart={isItemInCart(item.assetId)}
                                        onClick={itemAction}
                                        isHovered={true}
                                    >
                                        {isItemInCart(item.assetId)
                                            ? <RemoveShoppingCartRounded />
                                            : <AddShoppingCartRounded />
                                        }
                                    </AddCartButton>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </Box >
        </Modal >

    )
}

export default ItemModal