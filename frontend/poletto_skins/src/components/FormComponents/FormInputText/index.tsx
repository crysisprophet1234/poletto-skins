import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

export interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label: string
    disabled?: boolean
    placeholder?: string
    setValue?: UseFormSetValue<T>
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
                    borderRadius: '.25rem'
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: '30px',
                },
                input: {
                    ':disabled': {
                        color: '#FFFFFF',
                        fontSize: '16px',
                        WebkitTextFillColor: '#FFFFFF'
                    },
                }
            },
        },
    }
})

const FormInputText = <T extends FieldValues>({ name, control, label, disabled, placeholder }: FormInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error }
            }) => (
                <ThemeProvider theme={theme}>
                    <TextField
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        disabled={disabled}
                        placeholder={placeholder}
                        aria-label={label}
                    />
                </ThemeProvider>
            )}
        />
    )
}

export default FormInputText