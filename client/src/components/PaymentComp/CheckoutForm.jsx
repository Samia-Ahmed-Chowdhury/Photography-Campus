import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useStdActivateCls from '../../hooks/useStdActivateCls';

export const CheckoutForm = ({ closeModal, total, item }) => {
  const { userName, userEmail } = useContext(AuthContext)
  const [, refetchStdActivateCls] = useStdActivateCls(userEmail,'selected')
  console.log(item.classId)
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)

  const [axiosSecure] = useAxiosSecure()

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (total > 0) {
      axiosSecure.post(`/create-payment-intent`, { total: total })
        .then(res => {
          // console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [item, total, axiosSecure])


  const handleSubmit = async (event) => {
    console.log('first')
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('!stripe || !elements')
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log('card == null')
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('60', error.message)
      setCardError(error.message);
    } else {
      // console.log('[PaymentMethod]', paymentMethod)
    }
    setProcessing(true)
    //confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: userName || 'unknown',
          email: userEmail || 'anonymous'
        },
      },
    })

    if (confirmError) {
      console.log(confirmError.message)
      setCardError(confirmError.message);
    }
    console.log('payment Intent', paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      //save to db
      const paidItemInfo = {
        total,
        classId: item.classId,
        studentEmail:userEmail,
        transactionId: paymentIntent.id,
        date: new Date()
      }
      axiosSecure.post('/payments', paidItemInfo)
        .then(res => {
          console.log(res.data);
          axiosSecure.patch(`update_booked_classes/${item._id}`)
            .then(res => {
              axiosSecure.patch(`update_classes_seats/${item.classId}`)
                .then(res => {
                  if (res.data?.modifiedCount > 0) {
                    refetchStdActivateCls()
                    setProcessing(false)
                    Swal.fire(
                      'Good job!',
                      'paid Successfully (^_^)',
                      'success'
                    )
                  }
                  closeModal()
                })
            })

        })
        .catch(err => console.log(err))

    }
  }



  return (
    <>
      <form onSubmit={handleSubmit} className='mt-5'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <button
          disabled={!stripe || !clientSecret || processing}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {
            processing ? 'Paying....' : 'Pay'
          }
        </button>
        <button
          type='button'
          className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
          onClick={closeModal}
        >
          Cancel
        </button>
      </form>
      {
        cardError && <p className='text-red-600'>{cardError}</p>
      }
    </>
  );
};