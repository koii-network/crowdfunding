import { useQuery } from "react-query";
import axios from "axios";

const fetchExchangeRates = async (currency: string) => {
  try {
    const { data } = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useExchangeRates(currency: string) {
  return useQuery(`exchange-rates`, () => fetchExchangeRates(currency), {
    staleTime: 60 * 1000 * 60, // 1hr cache
    refetchOnWindowFocus: undefined
  });
}
