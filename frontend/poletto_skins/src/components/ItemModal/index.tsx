import { Close } from '@mui/icons-material'
import './styles.scss'

import { ItemType } from '@/types/entities/item'
import { Divider, Link, Stack, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FaExternalLinkAlt } from 'react-icons/fa'
import AddCartButton from '../AddCartButton'
import FloatBar from '../FloatBar'

type ItemModalProps = {
    item: ItemType
    open: boolean
    handleClose: () => void
}

const ItemModal = ({ item, open, handleClose }: ItemModalProps) => {

    const fullFloatCategoryName = (floatShort: string) => {
        switch (floatShort.toLocaleLowerCase()) {
            case 'bs':
                return 'Battle-Scared'
            case 'ww':
                return 'Well-Worn'
            case 'ft':
                return 'Field-Tested'
            case 'mw':
                return 'Minimal Wear'
            case 'fn':
                return 'Factory New'
        }
    }

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
                //maxWidth: 'fit-content',
                bgcolor: '#282633',
                borderRadius: '.5rem',
                boxShadow: 24,
                p: 4,
                outline: 0
            }}>
                <div className='item-modal-content'>
                    <div className='item-modal-header'>

                        <div className='item-title'>

                            {'statTrak' in item && item.statTrak &&
                                <Typography
                                    variant='h5'
                                    fontWeight={600}
                                    color={'#CF6A32'}>
                                    StatTrak™
                                </Typography>
                            }

                            {'subCategory' in item && item.subCategory &&
                                <Typography
                                    variant='h5'
                                    fontWeight={600}>
                                    {item.subCategory} |
                                </Typography>
                            }

                            <Typography
                                variant='h5'
                                fontWeight={600}>
                                {item.name}
                            </Typography>

                            {'floatShort' in item && item.floatShort &&
                                <Typography
                                    variant='h5'
                                    fontWeight={600}>
                                    ({fullFloatCategoryName(item.floatShort)})
                                </Typography>
                            }

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
                                    alt={item.name}
                                    loading='lazy'
                                />
                            </div>

                            <div className='item-actions'>
                                <Stack direction='row' spacing={2} justifyContent='space-between'>

                                    <Link
                                        href='#'
                                        underline='none'
                                    >
                                        Inspecionar <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href='#'
                                        underline='none'
                                    >
                                        Ver na Steam <FaExternalLinkAlt />
                                    </Link>

                                    <Link
                                        href={`https://youtube.com/results?search_query=CS2 ${'subCategory' in item && item.subCategory} ${item.name} - Skin Float And Wear Preview`}
                                        target='_blank'
                                        underline='none'
                                    >
                                        Highlight <FaExternalLinkAlt />
                                    </Link>

                                </Stack>
                            </div>

                            {'stickerArray' in item && (

                                <Stack
                                    direction='row'
                                    marginTop={2}
                                    spacing={2}
                                    display={'grid'}
                                    gridTemplateColumns={'repeat(4, 1fr)'}
                                    height={'90px'}
                                >
                                    {item.stickerArray.map((sticker) => {
                                        return (
                                            <Tooltip
                                                key={sticker.id}
                                                placement='top'
                                                arrow
                                                title={
                                                    <Typography noWrap minWidth='fit-content'>
                                                        {sticker.category} | {sticker.name} | {sticker.eventOrCollection}
                                                    </Typography>
                                                }>
                                                <div className='item-sticker'>
                                                    <img
                                                        src={sticker.imageUrl}
                                                        alt={sticker.name}
                                                        loading='lazy'
                                                    />
                                                    <Typography>
                                                        R${sticker.price}
                                                    </Typography>
                                                </div>
                                            </Tooltip>
                                        )
                                    })}
                                </Stack>

                            )}

                        </div>

                        <div className='item-modal-right-side'>

                            <div className='item-details-box float'>

                                {'floatFull' in item && 'floatShort' &&

                                    <>

                                        <div className='float-container'>
                                            <FloatBar floatValue={item.floatFull * 100} />
                                        </div>


                                        <div className='item-info'>

                                            <div className='item-field'>
                                                <Typography>
                                                    Float
                                                </Typography>
                                            </div>

                                            <div className='item-value'>
                                                <Typography>
                                                    {item.floatFull}
                                                </Typography>
                                            </div>

                                        </div>

                                        <Divider sx={{ bgcolor: '#BCBCC2' }} />

                                    </>

                                }

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
                                            Oculto {/*TODO: MOCKING*/}
                                        </Typography>
                                        <Typography>
                                            541 {/*TODO: MOCKING*/}
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
                                            R$ {item.steamPrice}
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
                                            R$ {item.price}
                                        </Typography>
                                    </div>

                                </div>

                                <div className='add-cart-container'>
                                    <AddCartButton onClick={() => {/* TODO: implement logic */ }} />
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