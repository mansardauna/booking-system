import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ActionTypes, useStoreDispatch } from "../../../store/FavoriteContext";
import Button from "../../../components/UI/Button";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

interface PaymentFormProps {
  calculatedPrice: number;
  productName: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ calculatedPrice, productName }) => {
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showPaymentComponent, setShowPaymentComponent] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your store

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement("cardNumber");

    if (cardElement) {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error(error);
      } else {
        // Send the token to your server for payment processing
        // In a real application, you should make a server-side request to charge the card

        // For this example, we'll simply simulate a successful payment
        setPaymentSuccessful(true);

        // Call the onPaymentSuccess callback
      }
    }
  };
  

  const handlePaymentSuccess = () => {
    setShowPaymentComponent(false);
    setPaymentSuccessful(true);

    
  };

  return (
    <div>
      {isPaymentSuccessful ? (
        <div>
          <h2>Payment Successful</h2>
          <p>Thank you for your payment.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="p-2 flex flex-col gap-3">
            <label>Card Details</label>
            <div className="border-gray-400 rounded-md border p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffff",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
          <Button variant="primary" onClick={handlePaymentSuccess} className="bg-black rounded-lg p-2 shadow-lg float-right">
            Pay NGN{calculatedPrice}
          </Button>
        </form>
      )}
    </div>
  );
};




interface PaymentComponentProps {
  productName: string;
  calculatedPrice: number;
  showPaymentComponent:any;
  setShowPaymentComponent:any;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ productName, calculatedPrice, showPaymentComponent, setShowPaymentComponent }) => {


  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="">Hall Name :</div>
          <div className="">{productName}</div>
        </div>
        <div className="flex gap-3">
          <div className="">Price :</div>
          <div className="">NGN{calculatedPrice}</div>
        </div>
        <PaymentForm calculatedPrice={calculatedPrice} 
        productName={productName} />
      </div>
    </Elements>
  );
};


export default PaymentComponent;
