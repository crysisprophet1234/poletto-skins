import { Checkbox, FormControl, FormControlLabel, ThemeProvider, createTheme } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export interface FormInputProps<T extends FieldValues, V> {
    name: Path<T>
    control: Control<T>
    label: string
    value: V
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#C85CD1'
        }
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                colorPrimary: '#C85CD1',
                root: {
                    color: '#C85CD1'
                },
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '20px'
                }
            }
        }
    }
})

const FormSingleCheckbox = <T extends FieldValues, V>({ name, control, label, value, checked, onChange }: FormInputProps<T, V>) => {
    return (
        <FormControl size={'small'} variant={'outlined'}>
            <FormControlLabel
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={() => (
                            <ThemeProvider theme={theme}>
                                <Checkbox
                                    disableRipple={true}
                                    checked={checked}
                                    onChange={onChange}
                                    value={String(value)}
                                />
                            </ThemeProvider>
                        )}
                    />
                }
                label={label}
            />

        </FormControl>
    )
}

export default FormSingleCheckbox