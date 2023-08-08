import React, {useState, useEffect} from 'react'
import Form from '../layouts/Form'
import { ButtonGroup, Grid, InputAdornment, Button as MuiButton } from '@mui/material'
import { Input, Select, Button } from '../controls'
import { makeStyles } from '@mui/styles'
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api'

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

    const {values, errors, handleInputChange} = props
    const classes = useStyles()
    const [customerList, setCustomerList] = useState([])

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
                        options = {customerList}
                        onChange = {handleInputChange}></Select>
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
                    margin={"0 0 0 15px"}
                    startIcon={<ReorderIcon/>}>Orders</Button>
                </Grid>
        </Grid>
        </Form>
    )
}
