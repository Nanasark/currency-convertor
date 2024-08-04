import { useState } from "react";

interface ExchangeRate {
  from: string;
  to: string;
  bid: string;
  ask: string;
}

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {

  const response = await fetch('/api/rates');
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }
  return response.json();
};

interface CalcProps {
  firstAmount?: number;  // Amount in the base currency
  secondAmount?: number; // Amount in the quote currency
  amountFromCalc: string;    // Currency code from which conversion starts
  amountToCalc: string;      // Currency code to which conversion is made
}

export const calculateConversion = async ({
  firstAmount,
  secondAmount,
  amountFromCalc,
  amountToCalc,
}: CalcProps): Promise<number> => {
  try {
    const data = await fetchExchangeRates();
    
    console.log("Fetched data:", data);

    const getExchangeRate = (from: string, to: string): ExchangeRate | undefined => {
      return data.find((entry) => entry.from === from && entry.to === to);
    };

    const rate = getExchangeRate(amountFromCalc, amountToCalc);
    const inverseRate = getExchangeRate(amountToCalc, amountFromCalc);

    console.log("Rate:", rate);
    console.log("Inverse Rate:", inverseRate);

    if (firstAmount && firstAmount !=0 && firstAmount != null) {
      // Convert using the rate directly if the first amount is provided
      if (rate) {
        return firstAmount * parseFloat(rate.bid);
      } else if (inverseRate) {
        return firstAmount / parseFloat(inverseRate.ask);
      }
    } else if (secondAmount && secondAmount !=0 && secondAmount != null) {
      // Convert inversely if the second amount is provided
      if (rate) {
        return secondAmount / parseFloat(rate.ask);
      } else if (inverseRate) {
        return secondAmount * parseFloat(inverseRate.bid);
      }
    }

    console.error("No valid exchange rate found.");
    return 0; // No valid rate found
  } catch (error) {
    console.error("Error in conversion calculation:", error);
    return 0;
  }
};