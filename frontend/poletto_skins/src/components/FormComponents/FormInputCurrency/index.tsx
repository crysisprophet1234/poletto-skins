import { ThemeProvider } from '@emotion/react'
import { createTheme, SxProps } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

export interface FormInputCurrencyProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label: string
    disabled?: boolean
    placeholder?: string
    setValue?: UseFormSetValue<T>
    sx?: SxProps
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#C85CD1'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    height: '30px',
                    backgroundColor: '#403D4D',
                    borderRadius: '.25rem',
                    '& .MuiInputBase-root': {
                        height: '30px'
                    },
                    '& .MuiInputBase-input': {
                        padding: '0 8px',
                        height: '30px',
                        ':disabled': {
                            color: '#FFFFFF',
                            fontSize: '16px',
                            WebkitTextFillColor: '#FFFFFF'
                        }
                    }
                }
            }
        }
    }
})

const FormInputCurrency = <T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    placeholder,
    sx
}: FormInputCurrencyProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error }
            }) => (
                <ThemeProvider theme={theme}>
                    <NumericFormat
                        customInput={TextField}
                        error={!!error}
                        onValueChange={(values) => {
                            onChange(values.floatValue)
                        }}
                        value={value}
                        thousandSeparator='.'
                        decimalSeparator=','
                        prefix='R$ '
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        isAllowed={(values) => {
                            const { floatValue } = values
                            return floatValue === undefined || floatValue <= 999999999.99
                        }}
                        fullWidth
                        disabled={disabled}
                        placeholder={placeholder || 'R$ 0,00'}
                        aria-label={label}
                        sx={sx}
                    />
                </ThemeProvider>
            )}
        />
    )
}

export default FormInputCurrency