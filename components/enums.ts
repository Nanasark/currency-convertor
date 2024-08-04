import { data } from "@/app/data";


// Extract unique values from a specific key in an array of objects
const currencies = new Set<string>();
data.forEach(item => {
    currencies.add(item.from);
});

export const fromenum = Array.from(currencies)


console.log(Array.from(currencies));