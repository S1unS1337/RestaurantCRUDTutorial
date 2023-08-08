import React from 'react'
import { Button as MuiButton } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        }
    }
}))

export default function Button(props) {

    const {margin, children, color, variant, onClick, className, ...other} = props
    const classes = useStyles()
  return (
    <MuiButton
        style={
            {
            margin 
            }
        }
        className={classes.root + ' ' + (className || '')}
        variant={variant || 'contained'}
        color={color || 'inherit'}
        onClick={onClick}
        {...other}>
            {children}
    </MuiButton>
  )
}
