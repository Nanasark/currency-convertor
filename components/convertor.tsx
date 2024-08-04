"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { calculateConversion } from "./calculate";

enum FromCurrency {
  USD = "USD",
  GBP = "GBP",
  GHS = "GHS",
  ZAR = "ZAR",
  TZS = "TZS",
  USDT = "USDT",
  USDC = "USDC",
  EUR = "EUR",
  NGN = "NGN",
  XAF = "XAF",
  XOF = "XOF",
  KES = "KES",
}

const from = [
  "USD",
  "GBP",
  "ZAR",
  "GHS",
  "NGN",
  "USDT",
  "USDC",
  "EUR",
  "KES",
  "XAF",
  "XOF",
  "TZS",
];
const to = [
  "USD",
  "GBP",
  "JPY",
  "ZAR",
  "GHS",
  "AED",
  "EUR",
  "KES",
  "XAF",
  "UGX",
  "XOF",
  "TZS",
  "CNH",
  "NGN",
  "INR",
];

enum ToCurrency {
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  INR = "INR",
  CNH = "CNH",
  GHS = "GHS",
  TZS = "TZS",
  UGX = "UGX",
  KES = "KES",
  NGN = "NGN",
  ZAR = "ZAR",
  AED = "AED",
  XAF = "XAF",
  XOF = "XOF",
  CAD = "CAD",
}

type Inputs = {
  amountFrom: string; // Using strings to maintain exact input values
  amountTo: string;
  fromCurrency: FromCurrency;
  toCurrency: ToCurrency;
};

export default function Converter() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      amountFrom: '',
      amountTo: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<number>(1);

  // Watch form fields to get live updates
  const amountFromValue = watch("amountFrom");
  const amountToValue = watch("amountTo");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      let conversion = 0;
      if (activeField === 1 && data.amountFrom) {
        // Convert from 'amountFrom' to 'amountTo'
        conversion = await calculateConversion({
          firstAmount: parseFloat(data.amountFrom),
          amountFromCalc: data.fromCurrency,
          amountToCalc: data.toCurrency,
        });
        setValue("amountTo", conversion.toFixed(2));
      } else if (activeField === 2 && data.amountTo) {
        // Convert from 'amountTo' to 'amountFrom'
        conversion = await calculateConversion({
          secondAmount: parseFloat(data.amountTo),
          amountFromCalc: data.fromCurrency,
          amountToCalc: data.toCurrency,
        });
        setValue("amountFrom", conversion.toFixed(2));
      }
    } catch (error) {
      console.error("Error during conversion:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field: number) => {
    setActiveField(field);
    if (field === 1) {
      setValue("amountTo", ''); // Clear the amountTo field when focusing on amountFrom
    } else {
      setValue("amountFrom", ''); // Clear the amountFrom field when focusing on amountTo
    }
  };

  return (
    <div className="w-full h-full">
      <form
        className="flex flex-col items-center justify-center w-full p-5  h-full text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-10 items-center w-full justify-center h-1/2">
        <div className=" flex flex-col gap-2">
          <label className="text-white">Amount to Send</label>
        <div className="flex lg:w-4/5 items-center justify-center rounded-[10px] h-[40px]">
       
       <input
         {...register("amountFrom")}
         className="pl-3 h-full w-3/4 outline-none rounded-tl-md rounded-bl-md"
         type="number"
         step="0.01" // Allows for numbers with up to two decimal places
         placeholder="Amount to Send"
         min="0"
         onFocus={() => handleFocus(1)}
         value={amountFromValue}
         onChange={(e) => setValue("amountFrom", e.target.value)}
       />
       <select
         {...register("fromCurrency")}
         className="h-full rounded-tr-md rounded-br-md w-1/4 text-white bg-black"
       >
         {from.map((currency, index) => (
           <option key={index} value={currency}>
             {currency}
           </option>
         ))}
       </select>
     </div>
        </div>
       
        <div className=" flex flex-col gap-2">
          <label className="text-white">Amount to Receive</label>
          <div className="flex lg:w-4/5 items-center justify-center rounded-[10px] h-[40px]">
          
            <input
              {...register("amountTo")}
              className="pl-3 h-full w-3/4 outline-none rounded-tl-md rounded-bl-md"
              type="number"
              step="0.01"
              placeholder="Amount to Receive"
              onFocus={() => handleFocus(2)}
              value={amountToValue}
              onChange={(e) => setValue("amountTo", e.target.value)}
            />
            <select
              {...register("toCurrency", { required: true })}
              className="h-full rounded-tr-md rounded-br-md w-1/4 text-white bg-black"
            >
              {to.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          </div>
         
        </div>
        <button
          type="submit"
          className={`rounded-lg w-[120px] h-[40px] text-black ${
            loading ? "bg-gray-400" : "bg-white hover:cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
        
      </form>
    </div>
  );
}
