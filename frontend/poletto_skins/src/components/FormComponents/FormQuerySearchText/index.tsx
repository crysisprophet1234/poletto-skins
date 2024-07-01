import { ThemeProvider } from '@emotion/react'
import { Clear, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, createTheme } from '@mui/material'
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
                    height: '100%',
                    backgroundColor: '#403D4D',
                    borderRadius: '.25rem'
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: '100%'
                },
                input: {
                    '::placeholder': {
                        color: '#bbb9c7',
                        opacity: 1,
                    },
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fill: '#bbb9c7'
                }
            }
        }
    }
})

const FormSearchQueryText = <T extends FieldValues>({ name, control, label, disabled, placeholder }: FormInputProps<T>) => {

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
                        value={value || ''}
                        fullWidth
                        disabled={disabled}
                        placeholder={placeholder}
                        aria-label={label}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: value && (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => onChange(undefined)}
                                        edge='end'
                                    >
                                        <Clear />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </ThemeProvider>
            )}
        />
    )
}

export default FormSearchQueryText