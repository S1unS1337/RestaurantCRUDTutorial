import React, {useState} from 'react'
import Form from '../layouts/Form'
import { Grid, InputAdornment } from '@mui/material'
import { Input, Select, Button } from '../controls'
import { makeStyles } from '@mui/styles'

const pMethods = [
  {id: 'none', title: 'Select'},
  {id: 'Cash', title: 'Cash'},
  {id: 'Card', title: 'Card'},

]

const useStyles = makeStyles(theme => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#f3b33d',
      fontWeight: 'bolder',
      fontSize: '1.5 em'
    }
  }
}))

export default function OrderForm(props) {

  const {values, errors, handleInputChange} = props
  const classes = useStyles()
  return (
    <Form>
      <Grid container >
            <Grid item xs={6} >
              <Input
                    margin = {"0 0 30px 0"}
                    disabled = {true}
                    label = "Order Number"
                    name = "orderNumber"
                    value = {values.orderNumber}
                    InputProps = {{
                    startAdornment: <InputAdornment
                        className={classes.adornmentText}
                        position='start'>#</InputAdornment>
                    }}
              />
                <Select
                    label = "Customer"
                    name = "customerId"
                    value = {values.customerId}
                    options = {[
                        {id: 0, title: 'Select'},
                        {id: 1, title: 'Vladik bro'},
                        {id: 2, title: 'Lyoha bro'},
                        {id: 3, title: 'Kolya bro'},
                        {id: 4, title: 'Dima bro'},
                        {id: 5, title: 'Stasik bro'},
                        {id: 6, title: 'Sanya bro'},
                        {id: 7, title: 'Tyoma bro'}
                    ]
                    }
                    onChange = {handleInputChange}
                ></Select>
            </Grid>
            <Grid item xs={6}>
            <Select
              label = "PaymentMethod"
              name = "pMethod"
              value = {values.pMethod}
              options = {pMethods}
              onChange = {handleInputChange}
              ></Select>

            <Input
                margin = {"30px 0 0 0"}
                disabled = {true}
                label = "Grand Total"
                name = "gTotal"
                value = {values.gTotal}
                InputProps = {{
                  startAdornment: <InputAdornment
                    className={classes.adornmentText}
                    position='start'>$</InputAdornment>
                }}
              />
            </Grid>
      </Grid>
    </Form>
  )
}
