import { useMediaQuery, useTheme } from '@mui/material'

interface BreakpointResult {
  isXL: boolean
  isLarge: boolean
  isMedium: boolean
  isSmall: boolean
}

export const useBreakpoint = (): BreakpointResult => {
  const theme = useTheme()

  return {
    isXL: useMediaQuery(theme.breakpoints.up('xl')),
    isLarge: useMediaQuery(theme.breakpoints.up('lg')),
    isMedium: useMediaQuery(theme.breakpoints.up('md')),
    isSmall: useMediaQuery(theme.breakpoints.down('sm'))
  }
}