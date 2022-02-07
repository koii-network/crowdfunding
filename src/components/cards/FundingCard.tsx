import { useFunding } from "components/funding";
// ui
import { Flex, Stack, Button, Image, Heading, Text, Badge } from "@chakra-ui/react";
interface Props {
  item: Record<string, any>;
}

export function FundingCard({ item }: Props) {
  // config
  const { dispatch } = useFunding();

  function openFundingModal() {
    dispatch({ type: "TOGGLE_FUND_MODAL" });
  }

  return (
    <Flex flexDir="column" w="100%" rounded="md" shadow="0px 2px 8px rgba(0, 0, 0, 0.16)">
      {/* Thumbnail */}
      <Image src={`https://koii.live/${item?.id}.png`} alt={item?.title} loading="lazy" objectFit="cover" bg="gray.100" h="150px" roundedTopLeft="1" roundedTopRight="1" roundedTop="md" />
      {/* Details */}
      <Flex flexDir="column" roundedBottomLeft="1" roundedBottomRight="1" p="4" bg="white" flexGrow="1" textAlign="left" roundedBottom="md">
        {/* Title */}
        {item?.isFeatured && (
          <Badge colorScheme="green" mb="1" mr="auto">
            Featured
          </Badge>
        )}
        <Stack direction="row" spacing="2" align="center" justify="space-between" my="2">
          <Heading as="h2" size="md" noOfLines={2} mb="1px" color="blue.500">
            {item?.title}
          </Heading>
          <Text fontSize="sm">{item?.claimed} claimed</Text>
        </Stack>
        <Stack direction="row" spacing="3" align="center" lineHeight="normal">
          <Text fontWeight="600" fontSize="sm">
            {item?.amount} AR
          </Text>
          <Text fontSize="xs" color="#717171">
            ${item?.usd} USD
          </Text>
        </Stack>
        {/* Description */}
        <Text noOfLines={3} fontSize="sm" mt="1" mb="8" color="blue.500" lineHeight="short">
          {item?.description}
        </Text>
        <Button w="100%" size="sm" onClick={openFundingModal}>
          Back Project
        </Button>
      </Flex>
    </Flex>
  );
}
