import React from 'react'
import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material'
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function OrderedFoodItems(props) {

  const {values, setValues} = props

  let orderedFoodItems = values.orderDetails

  const removeFoodItem = (index, id) =>{
    let x = {...values}
    x.orderDetails = x.orderDetails.filter((_, i) => i != index)
    setValues({ ...x })
  }

  const updateQuantity = (idx, value) =>{
    let x = {...values};
    let foodItem = x.orderDetails[idx]
    if(foodItem.quantity + value > 0){
      foodItem.quantity += value
    }
    setValues({...x})
  } 

  
  return (
    <List>
      {
        orderedFoodItems.map((item, idx) => (
          <Paper
          key = {idx}
          >
              <ListItem>
                  <ListItemText
                  primary = {item.foodItemName}
                  primaryTypographyProps={{
                    component: 'h1',
                    style: {
                      fontWeight: '500',
                      fontSize: '1.2em'
                    }
                  }}
                  secondary={
                    <>
                    <ButtonGroup
                    size='small'>
                      <Button
                      onClick={e => updateQuantity(idx, -1)}>-</Button>
                      <Button disabled>{item.quantity}</Button>
                      <Button
                      onClick={e => updateQuantity(idx, 1)}>+</Button>
                    </ButtonGroup>
                    </>
                  }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                    disableRipple
                    onClick={e => removeFoodItem(idx, item.orderDetailsId)}>
                        <BackspaceIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
          </Paper>
        ))
      }
    </List>
  )
}
