// ui
import { Button, Box, Flex, Heading } from "@chakra-ui/react";

interface Props {
  title: string;
  openFundingModal: () => void;
}

export function Nav({ title, openFundingModal }: Props) {
  return (
    <Box bg="white" px="4" color="blue.500">
      <Flex mx="auto" maxW="1180px" justify="space-between" align="center" py="3">
        <Heading size="md" fontWeight="500">
          {title}
        </Heading>

        <Button onClick={openFundingModal}>Back Project</Button>
      </Flex>
    </Box>
  );
}
