import React from 'react'
import Form from '../layouts/Form'
import { Grid } from '@mui/material'
import Input from "../controls/Input"
import Select from '../controls/Select'

export default function OrderForm() {
  return (
    <Form>
      <Grid container>
            <Grid item xs={6}>
              <Input
                disabled = {true}
                label = "Order Number"
                name = "orderNumber"
              />
              <Select
              label = "Customer"
              name = "customerId"
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
            <Input
                disabled = {true}
                label = "Grand Total"
                name = "gTotal"
              />
            </Grid>
      </Grid>
    </Form>
  )
}
