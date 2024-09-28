import { ThemeProvider } from '@emotion/react'
import { createTheme, SxProps } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

export interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label: string
    disabled?: boolean
    type?: React.HTMLInputTypeAttribute
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

const FormInputText = <T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    type,
    placeholder,
    sx
}: FormInputProps<T>) => {
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
                        value={type == 'number' ? Number(value).toFixed(2) : value}
                        fullWidth
                        type={type}
                        disabled={disabled}
                        placeholder={placeholder}
                        aria-label={label}
                        sx={sx}
                    />
                </ThemeProvider>
            )}
        />
    )
}

export default FormInputText