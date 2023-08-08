import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props) {

    const { margin, name, label, value, variant, onChange, error = null, ...other} = props
  return (
    <TextField 
        style={
          {
            margin 
          }
        }
        variant={variant || 'outlined'}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
        {...(error && {error: true, helperText: error})}
    />
  )
}
