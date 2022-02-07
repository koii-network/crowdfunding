import { useState, useEffect } from "react";
import { useFunding } from "components/funding";
// api
import { getBalance, getEthBalance } from "api/funding";
import { useExchangeRates } from "api/funding/useExchangeRates";
// ui
import { Box, Text, Stack, Progress } from "@chakra-ui/react";
// utils
import { formatDigitNumber, parseString } from "services/utils";

export function FundingBar() {
  // config
  const {
    state: { config }
  } = useFunding();
  const fundingGoal = config?.fundGoal;
  const { fundAddress } = config;

  const [{ status, raisedBalance }, setState] = useState<{ status: string; raisedBalance: string }>({ status: "idle", raisedBalance: "0" });

  const balance = parseString(raisedBalance);

  /* Get Eth Balance */
  const doGetEthBalance = async () => {
    try {
      setState(prevState => ({ ...prevState, status: "loading" }));
      const raisedBalance = await getBalance(fundAddress, config?.paymentType);

      setState(prevState => ({ ...prevState, status: "success", balance: raisedBalance }));
    } catch (error) {
      setState(prevState => ({ ...prevState, status: "error" }));
    }
  };

  useEffect(() => {
    doGetEthBalance();
  }, []);

  const percentageDone = ((balance / fundingGoal) * 100).toFixed(2);
  return (
    <Box>
      <Text textAlign="right" fontSize="xs" mb="2px">{`%${percentageDone}`}</Text>
      {/* Bar */}
      <Progress color="teal" bg="#D6D6D6" rounded="2xl" size="lg" value={balance} max={fundingGoal} h="22px" isIndeterminate={status === "loading"} />

      {/* Details */}
      <Stack direction="row" align="center" spacing="40px" mt="2" pl="4">
        <FundingStat label="raised" amount={balance} currency={config?.paymentType} />
        <FundingStat label="goal" amount={fundingGoal} currency={config?.paymentType} />
      </Stack>
    </Box>
  );
}

interface FundingStatProps {
  label: string;
  amount: number;
  currency: string;
}
function FundingStat({ label, amount, currency }: FundingStatProps) {
  /* Get Exchange rates */
  const { data: rates } = useExchangeRates(currency);

  const amountInUSD = amount * rates?.USD;
  return (
    <Stack align="center" justify="center" textAlign="center" spacing="0">
      <Text color="#237B75" lineHeight="normal">
        <Text fontWeight="bold" color="blue.500" as="span">
          {formatDigitNumber(amount, { minimumSignificantDigits: 2 })}{" "}
          <Text as="span" textTransform="uppercase">
            {currency}
          </Text>
        </Text>{" "}
        {label}
      </Text>
      <Text fontSize="xs" color="#717171" lineHeight="normal">
        ${formatDigitNumber(amountInUSD)} USD
      </Text>
    </Stack>
  );
}
