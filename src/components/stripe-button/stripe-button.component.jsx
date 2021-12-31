import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

  const priceForStripe = price * 100
  const publishableKey = 'pk_test_KjCXIXlrRyBYUpVhaIQPxP4Q'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }

  return (
    <StripeCheckout 
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
