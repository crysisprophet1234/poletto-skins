import { ThemeProvider } from '@emotion/react'
import { ListItemIcon, ListItemText, MenuItem, Select, createTheme } from '@mui/material'
import { Control, Controller, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

export interface Option {
    value: string
    label: string
    icon?: React.ReactElement
}

export interface FormInputProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    label: string
    disabled?: boolean
    placeholder?: string
    setValue?: UseFormSetValue<T>
    options: Option[]
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#C85CD1',
        }
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                root: {
                    height: '100%',
                    width: '200px',
                    backgroundColor: '#403D4D',
                    borderRadius: '.25rem',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',

                },
                filled: {
                    backgroundColor: '#403D4D',
                },
                select: {
                    display: 'flex',
                    alignItems: 'center'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '0'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#403D4D',
                    color: '#FFFFFF',
                    '&.Mui-selected': {
                        backgroundColor: '#575463',
                    },
                    '&:hover': {
                        backgroundColor: '#575463',
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#403D4D',
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fill: '#bbb9c7',
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '32px',
                }
            }
        }
    }
})

const FormSelect = <T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    placeholder,
    options
}: FormInputProps<T>) => {

    return (

        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value }
            }) => (
                <ThemeProvider theme={theme}>
                    <Select
                        labelId={label}
                        id={label}
                        displayEmpty
                        disabled={disabled}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value == '' ? undefined : e.target.value)}
                    >
                        <MenuItem value={''}>
                            {placeholder || 'Default'}
                        </MenuItem>

                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.icon && (
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={option.label} />
                            </MenuItem>
                        ))}

                    </Select>
                </ThemeProvider>
            )}
        />

    )

}

export default FormSelect