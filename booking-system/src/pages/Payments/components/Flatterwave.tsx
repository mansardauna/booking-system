import React, { useState } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button";

interface FlutterwavePaymentProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onCancel: (paymentData: any) => void;
}

const FlutterwavePayment: React.FC<FlutterwavePaymentProps> = ({ amount, onSuccess, onCancel }) => {
  const flutterwaveConfig = {
    public_key: 'FLWPUBK_TEST-8bfa1784cd263c06d73afc117b5b1f59-X', // Replace with your Flutterwave public key
    tx_ref: Date.now().toString(), // A unique transaction reference
    amount: amount, // The amount to be paid
    currency: "NGN", // The currency
    payment_type: "card", // Payment type (e.g., "card", "banktransfer", "mobilemoney", etc.)
    redirect_url: "http://localhost:3000/product", // Replace with your redirect URL
    // Add other necessary parameters for your specific use case
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        "https://api.flutterwave.com/v3/charges?type=card",
        flutterwaveConfig,
        {
          headers: {
            Authorization: `FLWSECK_TEST-fdbf7027ec3220d19c3a53b5d60fe1f7-X`, // Replace with your Flutterwave secret key
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
      <Button variant="primary" className=" bg-yellow-500 text-black rounded-lg hover:text-white border-none shadow-md w-full" onClick={initiatePayment}>Pay with Flutterwave</Button>
    </div>
  );
};

export default FlutterwavePayment;
