import FormInputText from '@/components/FormComponents/FormInputText'
import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Link, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form'

export interface FormInputProps<T extends FieldValues> {
    label: Path<T>
    placeholder: string
    control: Control<T>
    reset: UseFormReset<T>
    onSave?: () => void
    onConfirm?: () => void
}

const EditableInput = <T extends FieldValues>({
    label,
    placeholder,
    control,
    reset,
    onSave,
    onConfirm
}: FormInputProps<T>) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEditing(false)
                setIsDeleting(false)
                //reset() TODO: reseting here also destroys the value typed when click "save" for some reason...
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [reset])

    const handleEditClick = () => {
        setIsEditing(true)
        setIsDeleting(false)
    }

    const handleDeleteClick = () => {
        setIsDeleting(true)
        setIsEditing(false)
    }

    const handleSaveClick = () => {
        if (onSave) onSave()
        setIsEditing(false)
    }

    const handleConfirmClick = () => {
        if (onConfirm) onConfirm()
        setIsDeleting(false)
    }

    return (
        <Stack
            direction={'row'}
            gap={2}
            flexWrap={'nowrap'}
            justifyContent={'space-around'}
            alignItems={'center'}
            ref={containerRef}
            sx={{
                '& .button-container': {
                    minWidth: '120px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                },
                '& .button': {
                    minWidth: '100px',
                },
            }}
        >

            <Typography
                variant='body1'
                sx={{
                    flexShrink: 0,
                    width: '100px',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize'
                }}
            >
                {label}:
            </Typography>

            <FormInputText
                name={label}
                control={control}
                disabled={!isEditing}
                label={label}
                placeholder={placeholder}
            />

            <Box className='button-container' flexGrow={1} gap={2} display={'flex'}>
                {isEditing ? (
                    <Link
                        href='#'
                        underline='hover'
                        onClick={handleSaveClick}
                        sx={{
                            color: '#806cf5',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Salvar
                    </Link>
                ) : isDeleting ? (
                    <Link
                        href='#'
                        underline='hover'
                        onClick={handleConfirmClick}
                        sx={{
                            color: '#806cf5',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Confirmar
                    </Link>
                ) : (
                    <>
                        <IconButton onClick={handleEditClick} sx={{ padding: 0 }}>
                            <Edit
                                sx={{
                                    color: '#817e8f',
                                    '&:hover': {
                                        color: '#bbb9c7',
                                    },
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} sx={{ padding: 0 }}>
                            <Delete
                                sx={{
                                    color: '#817e8f',
                                    '&:hover': {
                                        color: '#bbb9c7',
                                    },
                                }}
                            />
                        </IconButton>
                    </>
                )}
            </Box>
        </Stack>
    )
}

export default EditableInput