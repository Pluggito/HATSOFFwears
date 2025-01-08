import React from 'react'
import { Link } from 'react-router'

const OrderSummary = () => {
  return (
    <div>
        <h2>Order Placed Successfully</h2>
        <p>You have been sent an email For your reciept </p> 
        <Link to={'/'}>Home</Link>
    </div>
  )
}

export default OrderSummary
