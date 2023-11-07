// PaymentComponent.tsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ActionTypes, useStoreDispatch } from "../../../store/FavoriteContext";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

interface PaymentFormProps {
  calculatedPrice: number;
  productName: string;
  selectedPaymentMethod: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ calculatedPrice, productName }) => {
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showPaymentComponent, setShowPaymentComponent] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your store
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (selectedPaymentMethod === 'stripe') {
      // Handle Stripe payment
      const cardElement = elements.getElement("cardNumber");

      if (cardElement) {
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          console.error(error);
        } else {
          // Simulate a successful Stripe payment
          setPaymentSuccessful(true);
        }
      }
    } else if (selectedPaymentMethod === 'flutterwave') {
      // Handle Flutterwave payment
      // Implement your Flutterwave payment logic here
    }
  };

  

  const handlePaymentSuccess = (item:any) => {
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
          <button onClick={handlePaymentSuccess} className="bg-black rounded-lg p-2 shadow-lg float-right">
            Pay NGN{calculatedPrice}
          </button>
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);


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
        {selectedPaymentMethod && (
          <PaymentForm
            calculatedPrice={calculatedPrice}
            productName={productName}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        )}
        </div>
    </Elements>
    
  );
};


export default PaymentComponent;
