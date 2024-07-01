import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { ThemeProvider, ToggleButton, createTheme } from '@mui/material'
import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'


export interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label: string
    disabled?: boolean
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#C85CD1',
        }
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#403D4D',
                    color: '#FFFFFF',
                    '&.Mui-selected': {
                        backgroundColor: '#C85CD1',
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: '#E08BD6',
                        }
                    },
                    '&:hover': {
                        backgroundColor: '#5A5565',
                    }
                }
            }
        }
    }
})


const FormToggleButton = <T extends FieldValues>({
    name,
    control,
    label,
    disabled
}: FormInputProps<T>) => {

    const [selected, setSelected] = useState(false)

    return (

        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value }
            }) => (
                <ThemeProvider theme={theme}>
                    <ToggleButton
                        aria-label={label}
                        disabled={disabled}
                        value={value || false}
                        selected={selected}
                        onChange={() => {
                            setSelected(!selected)
                            onChange(selected ? undefined : true)
                        }}
                    >
                        {selected ? <Favorite /> : <FavoriteBorder />}
                    </ToggleButton>
                </ThemeProvider>
            )}
        />

    )

}

export default FormToggleButton

