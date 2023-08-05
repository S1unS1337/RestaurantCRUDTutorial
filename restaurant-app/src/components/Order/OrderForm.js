import React, {useState} from 'react'
import Form from '../layouts/Form'
import { Grid } from '@mui/material'
import { Input, Select, Button } from '../controls'

const pMethods = [
  {id: 'none', title: 'Select'},
  {id: 'Cash', title: 'Cash'},
  {id: 'Card', title: 'Card'},

]

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString()

const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deletedOrderItems: '',
  orderDetails: []
})

export default function OrderForm() {


  const [values, setValues] = useState(getFreshModelObject())
  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const resetFormControls = () =>{
    setValues(getFreshModelObject())
  }

  return (
    <Form>
      <Grid container>
            <Grid item xs={6}>
              <Input
                disabled = {true}
                label = "Order Number"
                name = "orderNumber"
                value = {values.orderNumber}
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
                disabled = {true}
                label = "Grand Total"
                name = "gTotal"
                value = {values.gTotal}
              />
            </Grid>
      </Grid>
    </Form>
  )
}
