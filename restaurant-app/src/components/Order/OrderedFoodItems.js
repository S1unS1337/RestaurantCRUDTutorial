import React from 'react'
import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { roundTo2DecimalPoint } from '../../utils';

const useStyles = makeStyles(theme =>({
    paperRoot: {
      margin: '15 px 0px',
      '&:hover': {
        cursor: 'pointer'
      },
      '&:hover $deleteButton': {
        display: 'block'
      }
    },
    buttonGroup: {
        backgroundColor: 'E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2 em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: 'E81719'
        }
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2 em',
        margin: '0px 10px'
    },
    listItem: {
        margin:'2px 0px'
    }
}))

export default function OrderedFoodItems(props) {

    const {values, setValues} = props
    const classes = useStyles()
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
            className={classes.paperRoot}
            >
                <ListItem
                className={classes.listItem}
                >
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
                        size='small'
                        className={classes.buttonGroup}
                        >
                        <Button
                        onClick={e => updateQuantity(idx, -1)}>-</Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button
                        onClick={e => updateQuantity(idx, 1)}>+</Button>
                        </ButtonGroup>
                        <span 
                            className={classes.totalPerItem}                
                        >
                        {'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
                        </span>
                        </>
                    }
                    secondaryTypographyProps={{
                        component: 'div'
                    }}
                    />
                    <ListItemSecondaryAction
                    className={classes.deleteButton}
                    >
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
