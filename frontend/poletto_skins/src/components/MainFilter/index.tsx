import FormInputText from '@/components/FormComponents/FormInputText'
import FormSingleCheckbox from '@/components/FormComponents/FormMultiCheckBox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, Typography, debounce } from '@mui/material'
import Slider from '@mui/material/Slider'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaChevronUp } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'
import { z } from 'zod'
import './styles.scss'

type FilterSections = 'price' | 'float' | 'category' | 'others'

type Exteriors = {
    id: 'bs' | 'ww' | 'ft' | 'mw' | 'fn',
    fullName: 'Battle-Scarred' | 'Well-Worn' | 'Field-Tested' | 'Minimal Wear' | 'Factory New',
    minValue: number,
    maxValue: number
}

const exteriorsArr: Exteriors[] = [
    { id: 'bs', fullName: 'Battle-Scarred', minValue: 0.45, maxValue: 1.00 },
    { id: 'ww', fullName: 'Well-Worn', minValue: 0.38, maxValue: 0.45 },
    { id: 'ft', fullName: 'Field-Tested', minValue: 0.15, maxValue: 0.38 },
    { id: 'mw', fullName: 'Minimal Wear', minValue: 0.07, maxValue: 0.15 },
    { id: 'fn', fullName: 'Factory New', minValue: 0.00, maxValue: 0.07 }
]

type Category = {
    id: string
    name: string
}

const categoriesArr: Category[] = [
    { id: 'assault-rifles', name: 'Assault Rifles' },
    { id: 'sniper-rifles', name: 'Sniper Rifles' },
    { id: 'knives', name: 'Knives' },
    { id: 'shotguns', name: 'Shotguns' },
    { id: 'pistols', name: 'Pistols' },
    { id: 'gloves', name: 'Gloves' },
    { id: 'cases', name: 'Cases' }
]

type Others = Category

const othersArr: Category[] = [
    { id: 'stat-trak', name: 'StatTrak' },
    { id: 'stickers', name: 'Stickers' },
    { id: 'souvenir', name: 'Souvenir' }
]

const filterSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    minFloat: z.string().optional(),
    maxFloat: z.string().optional(),
    category: z.array(z.string()).optional(),
    others: z.array(z.string()).optional()
})

type FilterSchemaType = z.infer<typeof filterSchema>

type MainFilterProps = {
    onFilterChange: (values: FilterSchemaType) => void
}

const MainFilter = ({ onFilterChange }: MainFilterProps) => {

    const maxPriceFromApi = '100000'

    const {
        control,
        reset,
        setValue,
        watch,
        trigger
    } = useForm<FilterSchemaType>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            minPrice: '0',
            maxPrice: maxPriceFromApi,
            minFloat: '0',
            maxFloat: '1',
        }
    })

    const debouncedSubmit = useRef(
        debounce(async (values) => {
            const isValid = await trigger()
            if (isValid) {
                onFilterChange(values as FilterSchemaType)
            }
        }, 1500)
    )

    useEffect(() => {
        const subscription = watch((values) => {
            debouncedSubmit.current(values as FilterSchemaType)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const [expandedSections, setExpandedSections] = useState<Record<FilterSections, boolean>>({
        price: false,
        float: false,
        category: false,
        others: false
    })

    const toggleExpand = (section: FilterSections) => {

        setExpandedSections((prevSections) => ({
            ...prevSections,
            [section]: !expandedSections[section]
        }))
    }

    const [price, setPrice] = useState<number[]>([0, Number(maxPriceFromApi)])

    const handlePriceSliderChange = (_event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[])
    }

    useEffect(() => {
        setValue('minPrice', Math.min(...price).toString())
        setValue('maxPrice', Math.max(...price).toString())
    }, [price, setValue])

    const [float, setFloat] = useState<number[]>([0, 1])

    const handleFloatSliderChange = (_event: Event, newValue: number | number[]) => {
        setFloat(newValue as number[])
    }

    useEffect(() => {
        setValue('minFloat', Math.min(...float).toString())
        setValue('maxFloat', Math.max(...float).toString())
    }, [float, setValue])

    const [exterior, setExterior] = useState<Exteriors[]>([])

    const handleFloatCheckbox = ({ newValue }: { newValue: Exteriors }): void => {

        setExterior((prevExteriors) => {
            if (prevExteriors.includes(newValue)) {
                return prevExteriors.filter((ext) => ext.id !== newValue.id)
            } else {
                return [...prevExteriors, newValue]
            }
        })

    }

    useEffect(() => {

        const calculateFloat = () => {

            if (exterior.length === 0) {
                setFloat([0, 1])
                return
            }

            const minValues = exterior.map((ext) => ext.minValue)
            const maxValues = exterior.map((ext) => ext.maxValue)

            const min = Math.min(...minValues)
            const max = Math.max(...maxValues)

            setFloat([min, max])
        }
        calculateFloat()
    }, [exterior, setValue])

    const [category, setCategory] = useState<Category[]>([])

    const handleCategoryCheckbox = ({ newValue }: { newValue: Category }): void => {

        setCategory((prevCategories) => {
            if (prevCategories.includes(newValue)) {
                return prevCategories.filter((cat) => cat.name !== newValue.name)
            } else {
                return [...prevCategories, newValue]
            }
        })

    }

    useEffect(() => {
        setValue('category', category.map(x => x.id))
    }, [category, setValue])

    const [others, setOthers] = useState<Others[]>([])

    const handleOthersCheckbox = ({ newValue }: { newValue: Others }): void => {

        setOthers((prevOthers) => {
            if (prevOthers.includes(newValue)) {
                return prevOthers.filter((other) => other.name !== newValue.name)
            } else {
                return [...prevOthers, newValue]
            }
        })

    }

    useEffect(() => {
        setValue('others', others.map(x => x.id))
    }, [others, setValue])

    const resetFields = () => {
        reset()
        setPrice([0, Number(maxPriceFromApi)])
        setFloat([0, 1])
        setCategory([])
        setExterior([])
        setOthers([])
    }
    return (

        <div className='filter-main-container'>

            <div className='upper-area'>

                <span className='title'>Filtros</span>

                <div className='reset-filter-area'>
                    <button type='button' className='reset-filter-btn' onClick={() => resetFields()}>
                        <GrPowerReset />
                    </button>
                </div>

            </div>

            <div className='bottom-area'>

                <div className='delimiter' />

                <div className='filter-section' about='price-filter'>

                    <div className='filter-header' onClick={() => toggleExpand('price')}>
                        <label htmlFor='price'>Preço</label>
                        <div className={`expand-icon ${expandedSections.price ? 'expanded' : ''}`}> <FaChevronUp /> </div>
                    </div>

                    <div className={`filter-content ${expandedSections.price ? 'expanded' : ''} price`}>

                        <div className='slider-container'>

                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={price}
                                min={0}
                                max={Number(maxPriceFromApi)}
                                onChange={handlePriceSliderChange}
                                valueLabelDisplay='auto'
                                getAriaValueText={(value) => `R$${value}`}
                                sx={{
                                    color: '#C85CD1',
                                    '& .MuiSlider-thumb': {
                                        width: 16,
                                        height: 16,
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: '0px 0px 10px 5px rgba(200, 92, 209, 0.5)'
                                        }
                                    },
                                    '& .MuiSlider-track': {
                                        height: 4,
                                        borderRadius: 4
                                    },
                                    '& .MuiSlider-rail': {
                                        height: 4,
                                        borderRadius: 4
                                    }
                                }}
                            />

                        </div>

                        <div className='input-container'>

                            <FormInputText
                                name='minPrice'
                                control={control}
                                label='min price'
                                disabled
                            />

                            <span className='divider'> - </span>

                            <FormInputText
                                name='maxPrice'
                                control={control}
                                label='max price'
                                disabled
                            />

                        </div>

                    </div>

                </div>

                <div className='delimiter' />

                <div className='filter-section' about='float-filter'>

                    <div className='filter-header' onClick={() => toggleExpand('float')}>
                        <label htmlFor='float'>Float</label>
                        <div className={`expand-icon ${expandedSections.float ? 'expanded' : ''}`}> <FaChevronUp /> </div>
                    </div>

                    <div className={`filter-content ${expandedSections.float ? ' expanded' : ''} float`}>

                        <div className='slider-container'>

                            <div className='slider'>
                                <Slider
                                    getAriaLabel={() => 'Float range'}
                                    value={float}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={handleFloatSliderChange}
                                    valueLabelDisplay='off'
                                    getAriaValueText={(value) => `${value}`}
                                    sx={{
                                        color: '#C85CD1',
                                        '& .MuiSlider-thumb': {
                                            width: 16,
                                            height: 16,
                                            '&:hover, &.Mui-focusVisible': {
                                                boxShadow: '0px 0px 10px 5px rgba(200, 92, 209, 0.5)'
                                            }
                                        },
                                        '& .MuiSlider-track': {
                                            height: 4,
                                            borderRadius: 4
                                        },
                                        '& .MuiSlider-rail': {
                                            height: 4,
                                            borderRadius: 4
                                        }
                                    }}
                                />
                            </div>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    variant='body2'
                                    onClick={() => {
                                        setFloat([0, float[1]])
                                        handleFloatSliderChange
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {0}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    onClick={() => {
                                        setFloat([float[0], 1])
                                        handleFloatSliderChange
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {1}
                                </Typography>
                            </Box>

                        </div>

                        <div className='input-container'>

                            <FormInputText
                                name='minFloat'
                                control={control}
                                label='min float'
                                disabled
                            />

                            <span className='divider'> - </span>

                            <FormInputText
                                name='maxFloat'
                                control={control}
                                label='max float'
                                disabled
                            />

                        </div>

                        <div className='float-exterior-checkboxes'>

                            {exteriorsArr.map((ext) => (
                                <div className='checkbox-container' key={ext.id}>
                                    <FormControlLabel
                                        label={ext.fullName}
                                        control={
                                            <Checkbox
                                                id={ext.id}
                                                disableRipple={true}
                                                checked={exterior.includes(ext)}
                                                onChange={() => handleFloatCheckbox({ newValue: ext })}
                                                sx={{
                                                    color: '#C85CD1',
                                                    '& .MuiSvgIcon-root': { fontSize: 18 }
                                                }}
                                            />
                                        }
                                    />
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className='delimiter' />

                <div className='filter-section' about='category-filter'>

                    <div className='filter-header' onClick={() => toggleExpand('category')}>
                        <label htmlFor='category'>Categoria</label>
                        <div className={`expand-icon ${expandedSections.category ? 'expanded' : ''}`}> <FaChevronUp /> </div>
                    </div>

                    <div className={`filter-content ${expandedSections.category ? ' expanded' : ''} category`}>

                        <div className='category-checkboxes'>

                            {categoriesArr.map((cat) => (

                                <div className='checkbox-container' key={cat.id}>
                                    <FormSingleCheckbox
                                        key={cat.id}
                                        name='category'
                                        control={control}
                                        label={cat.name}
                                        value={cat.id}
                                        checked={category.includes(cat)}
                                        onChange={() => handleCategoryCheckbox({ newValue: cat })}
                                    />
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className='delimiter' />

                <div className='filter-section' about='others-filter'>

                    <div className='filter-header' onClick={() => toggleExpand('others')}>
                        <label htmlFor='others'>Outros</label>
                        <div className={`expand-icon ${expandedSections.others ? 'expanded' : ''}`}> <FaChevronUp /> </div>
                    </div>

                    <div className={`filter-content ${expandedSections.others ? ' expanded' : ''} others`}>

                        <div className='others-checkboxes'>

                            {othersArr.map((other) => (

                                <div className='checkbox-container' key={other.id}>
                                    <FormSingleCheckbox
                                        key={other.id}
                                        name='others'
                                        control={control}
                                        label={other.name}
                                        value={other.id}
                                        checked={others.includes(other)}
                                        onChange={() => handleOthersCheckbox({ newValue: other })}
                                    />
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default MainFilter