import { useFunding } from "components/funding";
// ui
import { Flex, Text, FormControl, InputGroup, InputRightElement, Input, FormErrorMessage, Stack, Button } from "@chakra-ui/react";

// forms
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PledgeFormSchema } from "services/utils/validations";

interface Props {
  onSubmit: (amount?: number) => void;
}

type FormValues = {
  amount: number;
};

export function FundingPledgeForm({ onSubmit }: Props) {
  // config
  const {
    state: { config }
  } = useFunding();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({
    mode: "onTouched",
    resolver: yupResolver(PledgeFormSchema)
  });

  const onFormSubmit: SubmitHandler<FormValues> = ({ amount }) => {
    onSubmit(amount);
  };

  return (
    <Flex as="form" flexDir="column" alignItems="center" onSubmit={handleSubmit(onFormSubmit)} bg="white" shadow="lg" p="4" rounded="12px" color="blue.500">
      <Text fontWeight="600" fontSize="2xl">
        Token Only
      </Text>
      <Stack direction="row" spacing="4" align="center" mt="4">
        <FormControl bg="#F5F5F5" color="#171753" isInvalid={!!errors.amount} pos="relative">
          <InputGroup size="lg">
            <Input type="number" id="amount" step="any" px="4" pr="14" textAlign="right" placeholder="2.0" {...register("amount")} />
            <InputRightElement pointerEvents="none" color="rgba(55, 55, 101, 1)" fontSize="1.2em" textTransform="uppercase" children={config?.paymentType} pr="2" />
          </InputGroup>
        </FormControl>
        <Button size="lg" type="submit">
          Pledge
        </Button>
      </Stack>
      {errors.amount && (
        <Text fontSize="xs" color="red.500" w="100%" mt="2px">
          {errors.amount?.message}
        </Text>
      )}
      <Text mt="4" fontSize="sm">
        “Tokens Only” contributions only receive tokens. Tokens are rewared in proportion to the pledge amount.
      </Text>
    </Flex>
  );
}
