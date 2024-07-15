import Cart from '@/components/Cart'
import FormSearchQueryText from '@/components/FormComponents/FormQuerySearchText'
import FormSelect from '@/components/FormComponents/FormSelect'
import FormToggleButton from '@/components/FormComponents/FormToggleButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { DiscountRounded, NewReleasesRounded, SortRounded } from '@mui/icons-material'
import { debounce } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import './styles.scss'

const sortOptions = [
    {
        value: 'priceAsc',
        label: 'Menor preço',
        icon: <SortRounded />
    },
    {
        value: 'priceDesc',
        label: 'Maior preço',
        icon: <SortRounded style={{ transform: 'scaleY(-1)' }} />
    },
    {
        value: 'floatAsc',
        label: 'Menor float',
        icon: <SortRounded />
    },
    {
        value: 'floatDesc',
        label: 'Maior float',
        icon: <SortRounded style={{ transform: 'scaleY(-1)' }} />
    },
    {
        value: 'discount',
        label: 'Desconto',
        icon: <DiscountRounded />
    },
    {
        value: 'newest',
        label: 'Itens novos',
        icon: <NewReleasesRounded />
    }
]

const filterSchema = z.object({
    query: z.string().min(3).optional().or(z.literal('')),
    sort: z.string().optional(),
    favorite: z.boolean().optional()
})

type FilterSchemaType = z.infer<typeof filterSchema>

type TopFilterProps = {
    onFilterChange: (values: FilterSchemaType) => void
}

const TopFilter = ({ onFilterChange }: TopFilterProps) => {

    const {
        control,
        watch,
        trigger
    } = useForm<FilterSchemaType>({
        resolver: zodResolver(filterSchema)
    })

    const debouncedSubmit = useRef(
        debounce(async (values) => {
            const isValid = await trigger()
            if (isValid) {
                onFilterChange(values as FilterSchemaType)
            }
        }, 750)
    )

    useEffect(() => {
        const subscription = watch((values) => {
            debouncedSubmit.current(values as FilterSchemaType)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (

        <div className='filter-top-container'>

            <div className='filter-top-section'>
                <FormSearchQueryText
                    name='query'
                    control={control}
                    label='query search'
                    placeholder='Busque o nome do item, skin, sticker...'
                />

                <FormSelect
                    name='sort'
                    control={control}
                    label='sort'
                    options={sortOptions}
                    placeholder='Padrão'
                />

                <FormToggleButton
                    name='favorite'
                    control={control}
                    label='favorite'
                />

            </div>

            <div className='filter-top-section'>

                <Cart />

            </div>

        </div>

    )

}

export default TopFilter