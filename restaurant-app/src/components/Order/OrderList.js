import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import Table from '../layouts/Table'
import { Icon, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const {setOrderId, setOrderListVisibility} = props

    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then(res => {
            setOrderList(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id)
        setOrderListVisibility(false)
    }

  return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payed with</TableCell>
                <TableCell>Grand total</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                orderList.map(item => (
                    <TableRow key = {item.orderMasterId}>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}
                        >
                            #{item.orderNumber}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}

                        >
                            {item.customer.customerName}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}            
                        >
                            {item.pMethod}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}
                        >
                            {item.gTotal} $
                        </TableCell>
                        <TableCell>
                            <DeleteOutlineTwoToneIcon
                                color='secondary'
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  )
}
