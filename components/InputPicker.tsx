
"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";

// Define the shape of the context
interface ContextType {
isFirstChoice: boolean;
  setIsFirstChoice: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value that matches the context type
const defaultContextValue: ContextType = {
    isFirstChoice: false,
  setIsFirstChoice: () => {}, // This is a no-op function
};

// Create the context with the default value
const Context = createContext<ContextType>(defaultContextValue);

const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFirstChoice, setIsFirstChoice] = useState(true);
  
  return (
    <Context.Provider value={{ isFirstChoice,setIsFirstChoice }}>
      {children}
    </Context.Provider>
  );
};

export const useInputChoice = () => useContext(Context);

export default InputProvider;
