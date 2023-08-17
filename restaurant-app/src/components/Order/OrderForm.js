import React, {useState, useEffect} from 'react'
import Form from '../layouts/Form'
import { ButtonGroup, Grid, InputAdornment, Button as MuiButton } from '@mui/material'
import { Input, Select, Button } from '../controls'
import { makeStyles } from '@mui/styles'
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { roundTo2DecimalPoint } from '../../utils'
import Popup from '../layouts/Popup'
import OrderList from './OrderList'

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
  },
  submitButtonGroup: {
    backgroundColor: '#f3b33d',
    color: '#000',
    margin: theme.spacing(1),
    '& .MuiButton-label': {
        textTransform: 'none'
    },
    '&:hover': {
        backgroundColor: '#C0C0C0',
    }
  }
}))

export default function OrderForm(props) {

    const {values, setValues, errors, setErrors, handleInputChange, resetFormControls} = props
    const classes = useStyles()

    const [customerList, setCustomerList] = useState([])
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
        .then(res =>{
            let customerList = res.data.map(item => ({
                id: item.customerId,
                title: item.customerName
            }));
            customerList = [{id: 0, title: 'Select'}].concat(customerList);
            setCustomerList(customerList);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() =>{
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.foodItemPrice * item.quantity)
        }, 0)
        setValues({
            ...values,
            gTotal : roundTo2DecimalPoint(gTotal)
        })
    }, [JSON.stringify(values.orderDetails)])

    useEffect(() => {
        if (orderId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
            .then(res => {
                setValues(res.data)
                setErrors({})
            })
            .catch(err => console.log(err))
        }
    }, [orderId])

    const validateForm = () =>{
        let temp = {}
        temp.customerId = values.customerId != 0?"":"This field is required."
        temp.pMethod = values.pMethod != "none"?"":"This field is required."
        temp.orderDetails = values.orderDetails.length != 0?"":"This field is required."
        setErrors({...temp})
        return Object.values(temp).every(x => x === "");
    }

    const submitOrder = e => {
        e.preventDefault();
        if(validateForm()){
            createAPIEndpoint(ENDPOINTS.ORDER).create(values)
            .then(res => {
                console.log(res)
                resetFormControls()
            })
            .catch(err => console.log(err))
        }

    }

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

    return (
        <>
            <Form onSubmit = {submitOrder}>
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
                            options = {customerList}
                            onChange = {handleInputChange}
                            error = {errors.customerId}>

                            </Select>
                    </Grid>
                    <Grid item xs={6}>
                    <Select
                    label = "PaymentMethod"
                    name = "pMethod"
                    value = {values.pMethod}
                    options = {pMethods}
                    onChange = {handleInputChange}
                    error = {errors.pMethod}
                    >
                    </Select>

                    <Input
                        margin = {"30px 0 15px 0"}
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
                    <ButtonGroup className={classes.submitButtonGroup}>
                    <MuiButton
                        size='large'
                        endIcon={<RestaurantMenuIcon/>}
                        type='submit'>Submit
                    </MuiButton>
                    <MuiButton
                        size= 'small'
                        startIcon= {<ReplayIcon/>}
                        />
                    </ButtonGroup>
                    <Button
                        size="large"
                        onClick = {openListOfOrders}
                        margin={"0 0 0 15px"}
                        startIcon={<ReorderIcon/>}>Orders</Button>
                    </Grid>
            </Grid>
            </Form>
            <Popup
                title = "List of orders"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList
                {...{setOrderId, setOrderListVisibility}}
                />
            </Popup>
        </>
    )
}
