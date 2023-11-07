import React, { useState } from "react";
import axios from "axios";

interface FlutterwavePaymentProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onCancel: (paymentData: any) => void;
}

const FlutterwavePayment: React.FC<FlutterwavePaymentProps> = ({ amount, onSuccess, onCancel }) => {
  const flutterwaveConfig = {
    public_key: "YOUR_PUBLIC_KEY", // Replace with your Flutterwave public key
    tx_ref: Date.now().toString(), // A unique transaction reference
    amount: amount, // The amount to be paid
    currency: "NGN", // The currency
    payment_type: "card", // Payment type (e.g., "card", "banktransfer", "mobilemoney", etc.)
    redirect_url: "YOUR_REDIRECT_URL", // Replace with your redirect URL
    // Add other necessary parameters for your specific use case
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        "https://api.flutterwave.com/v3/charges?type=card",
        flutterwaveConfig,
        {
          headers: {
            Authorization: `Bearer YOUR_SECRET_KEY`, // Replace with your Flutterwave secret key
          },
        }
      );

      const paymentData = response.data;

      if (paymentData.status === "success") {
        // Payment was successful
        onSuccess(paymentData);
      } else {
        // Payment was not successful
        onCancel(paymentData);
      }
    } catch (error) {
      // Handle any errors
      console.error("Flutterwave payment error:", error);
      onCancel({ status: "error", message: "Payment failed" });
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Pay with Flutterwave</button>
    </div>
  );
};

export default FlutterwavePayment;
