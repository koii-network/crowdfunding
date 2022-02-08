import { FundingGallery, FundingSocials, FundingBar, FundingDetails, useFunding } from "components/funding";
// ui
import { Nav } from "components/common";
import { FundingModal } from "components/modals";
import { Box, Grid, Flex, Stack, Text, Image, Button, Link } from "@chakra-ui/react";
// icons
import { RiExternalLinkLine } from "react-icons/ri";
// utils
import { getFundContract } from "api/funding";
// assets
import Logo from "assets/logo.png";

export function FundingPage() {
  // config
  const {
    state: { config, fundModal },
    dispatch
  } = useFunding();

  function closeFundingModal() {
    dispatch({ type: "CLOSE_FUND_MODAL" });
  }
  function openFundingModal() {
    dispatch({ type: "TOGGLE_FUND_MODAL" });
  }

  return (
    <>
      {fundModal.isOpen && <FundingModal isOpen={fundModal.isOpen} onClose={closeFundingModal} />}
      <Box>
        <Nav title={config?.title} openFundingModal={openFundingModal} />
        <Box bg="#F5F5F5" color="blue.500" py={{ base: "8", lg: "16" }} minH="100vh">
          <Box mx="auto" maxW="1180px" px="4">
            {/* Grid #1 */}
            <Grid templateColumns={{ base: "1fr", lg: "640px 1fr" }} gap={{ base: 8, lg: 12 }} minW="0">
              {/* Slider */}
              <FundingGallery />
              {/* Project Details */}
              <Flex order={{ base: "1", lg: "2" }} flexDir="column" justify="flex-start" pt={{ base: "0", lg: "8" }} minW="0">
                <Text as="h2" fontSize="32px" fontWeight="600" noOfLines={2} mb="2" lineHeight="normal">
                  {config?.title}
                </Text>
                <Text noOfLines={2} lineHeight="normal">
                  Fighting plagiarism with a searchable, creator-owned world wide registry. Get rewarded for your work.
                </Text>

                {/* Company */}
                <Stack direction="row" spacing="18px" align="center" mt="22px" mb={{ base: "30px", lg: "40px" }}>
                  {/* Logo */}
                  <Image src={Logo} alt="logo" boxSize="52px" rounded="full" />
                  <div>
                    <Text fontSize="lg" mb="2px">
                      {config?.companyName}
                    </Text>
                    <FundingSocials />
                  </div>
                </Stack>
                {/* Bar */}
                <FundingBar />

                {/* Actions */}
                <Button size="lg" my="25px" w="100%" alignItems="center" onClick={openFundingModal}>
                  Back Project{" "}
                  <Text as="span" ml="2" fontSize="xs" color="blue.200">
                    with{" "}
                    <Text as="span" textTransform="uppercase">
                      {config?.paymentType}
                    </Text>
                  </Text>
                </Button>

                <Stack direction="row" spacing="4">
                  <Button as={Link} href={getFundContract(config?.fundAddress, config?.paymentType)} isExternal size="xs" rightIcon={<RiExternalLinkLine />} colorScheme="gray" isActive>
                    Fund Contract
                  </Button>
                </Stack>
              </Flex>
            </Grid>

            <Box as="hr" mt="40px" mb="20px" borderColor="#cdcde4" />
            <Grid templateColumns={{ base: "1fr", lg: "716px 1fr" }} gap={{ base: 8, lg: 16 }} minW="0">
              <FundingDetails />
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
