import { LinearProgress, linearProgressClasses, styled } from '@mui/material'
import { FaLocationArrow } from 'react-icons/fa6'

const ColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    position: 'relative',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        background: `linear-gradient(to right,
            #387784 0%, #387784 7%,
            #83b135 7%, #83b135 15%,
            #dfc04a 15%, #dfc04a 38%,
            #ef8641 38%, #ef8641 45%,
            #eb5757 45%, #eb5757 100%
        )`
    }
}))

const Arrow = styled(FaLocationArrow)<{ value: number }>(({ value }) => ({
    position: 'absolute',
    top: -21,
    left: `${value}%`,
    transform: 'translateX(-50%) rotate(135deg) scale(1.70)',

    //width: 0,
    //height: 0,
    //borderLeft: '5px solid transparent',
    //borderRight: '5px solid transparent',
    //borderTop: '10px solid black',
}))

const FloatBar = ({ floatValue }: { floatValue: number }) => {
    return (
        <div style={{ position: 'relative', marginTop: '20px' }}>
            <ColorLinearProgress variant="determinate" value={100} />
            <Arrow value={floatValue} />
        </div>
    )
}

export default FloatBar