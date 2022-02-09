import { useState } from "react";
import { useFunding, FundingSocials } from "components/funding";
// ui
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Stack, Text, Button, IconButton, Image, useToast } from "@chakra-ui/react";
import { FundingPledgeForm } from "components/funding";
// api
import { connectToWallet } from "api/wallet";
import { getWalletName, sendToken } from "api/funding";
// icon
import { HiOutlineArrowLeft } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ConnectToWalletProps {
  walletType: "metamask" | "arconnect" | "finnie";
}

export function FundingModal({ isOpen, onClose }: Props) {
  // config
  const {
    state: { config, fundModal },
    dispatch
  } = useFunding();

  const toast = useToast();
  const [status, setStatus] = useState<string>("idle");

  /* Helpers */

  const doSendToken = async () => {
    // console.log(`Sending ${fundModal.tokenAmount} using ${fundModal?.walletType} wallet with address ${fundModal.walletAddress}`);
    try {
      setStatus("loading");
      await sendToken({
        from: fundModal.walletAddress,
        to: config.fundAddress,
        amount: fundModal.tokenAmount,
        currency: config?.paymentType,
        wallet: fundModal?.walletType
      }).then(() => {
        toast({
          status: "success",
          title: "Sent successfully",
          isClosable: true
        });
        dispatch({
          type: "CLOSE_FUND_MODAL"
        });
      });
    } catch (error) {
      console.log(error);
      setStatus("idle");
      toast({
        status: "error",
        title: "There was an error sending your transaction.",
        isClosable: true
      });
    }
  };

  const onPledgeFormSubmit = async (amount?: number) => {
    dispatch({
      type: "CHANGE_MODAL_FIELDS",
      payload: {
        tokenAmount: amount,
        step: "connect-wallet"
      }
    });
  };

  const doConnectToWallet = async ({ walletType }: ConnectToWalletProps) => {
    setStatus("loading");
    await connectToWallet(walletType)
      .then(async res => {
        setStatus("idle");
        /* Connected, Save address */
        dispatch({
          type: "CHANGE_MODAL_FIELDS",
          payload: {
            walletAddress: res?.address,
            walletType,
            isWalletConnected: true,
            step: "confirm"
          }
        });
      })
      .catch(err => {
        setStatus("idle");
        if (err?.message === "extension_not_installed") {
          toast({
            status: "error",
            title: (
              <>
                You don't have{" "}
                <Text as="span" textTransform="capitalize">
                  {walletType}
                </Text>{" "}
                installed
              </>
            ),
            isClosable: true
          });
        } else {
          toast({
            status: "error",
            title: (
              <>
                There was an error connecting{" "}
                <Text as="span" textTransform="capitalize">
                  {walletType}
                </Text>
                . Please try again.
              </>
            ),
            isClosable: true
          });
        }
      });
  };

  function goToStep(step: any) {
    dispatch({
      type: "CHANGE_MODAL_FIELDS",
      payload: {
        step
      }
    });
  }

  /* Derived States */
  const step = fundModal.step;
  const isModalCentered = step !== "select-payment";
  const mainImage = config?.images?.[0];

  const connectorStyles = {
    w: "100%",
    variant: "outline",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
    size: "lg"
  };

  const renderConnector = () => {
    switch (config?.paymentType) {
      case "eth":
        return (
          <Button onClick={() => doConnectToWallet({ walletType: "metamask" })} isLoading={status === "loading"} {...connectorStyles}>
            MetaMask
          </Button>
        );
      case "ar":
        return (
          <Button onClick={() => doConnectToWallet({ walletType: "arconnect" })} isLoading={status === "loading"} {...connectorStyles}>
            ArConnect
          </Button>
        );
      default:
        return "#";
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom" isCentered>
        <ModalOverlay bg="rgba(53, 33, 181, 0.7)" />
        <ModalContent shadow="none" bg="transparent" my={isModalCentered ? "auto" : "60px"} color="blue.500">
          {step !== "select-payment" && (
            <IconButton
              aria-label="go-back"
              icon={<HiOutlineArrowLeft size="18px" />}
              color="white"
              bg="whiteAlpha.400"
              onClick={() => goToStep("select-payment")}
              pos="absolute"
              top={{ base: "-12", lg: "-8" }}
              left={{ base: "2", lg: "-2" }}
            />
          )}
          <ModalCloseButton color="white" bg="whiteAlpha.400" right={{ base: "2", lg: "-2" }} top={{ base: "-12", lg: "-8" }} shadow="lg" />
          {/* Select Payment */}
          {step === "select-payment" && (
            <ModalBody alignItems="flex-start">
              <FundingPledgeForm onSubmit={onPledgeFormSubmit} />
            </ModalBody>
          )}

          {/* Connect Wallet */}
          {step === "connect-wallet" && (
            <ModalBody alignItems="center">
              <Stack align="center" spacing="12px" w="100%" maxW="500px" mx="auto" bg="white" rounded="12px" py="4" px="8">
                <Text fontWeight="600" fontSize="xl">
                  Connect a Wallet
                </Text>
                {config?.paymentType !== "eth" && (
                  <Button onClick={() => doConnectToWallet({ walletType: "finnie" })} isLoading={status === "loading"} {...connectorStyles}>
                    Finnie
                  </Button>
                )}
                {renderConnector()}
              </Stack>
            </ModalBody>
          )}

          {step === "confirm" && (
            <ModalBody alignItems="center">
              <Stack align="center" spacing="12px" w="100%" maxW="500px" mx="auto" bg="white" rounded="12px" py="4" px="8">
                <Text fontWeight="600" fontSize="xl">
                  Confirm
                </Text>
                <Button w="100%" size="lg" onClick={doSendToken} isLoading={status === "loading"}>
                  Send {fundModal?.tokenAmount}{" "}
                  <Text as="span" ml="1">
                    {config?.paymentType}
                  </Text>
                </Button>
              </Stack>
            </ModalBody>
          )}

          {step === "success" && (
            <ModalBody alignItems="center">
              <Stack spacing="0" w="100%" maxW="304px" mx="auto" bg="gray.100" rounded="12px" overflow="hidden">
                <Image src={mainImage?.src} alt="main-image" w="100%" h="150px" objectFit="cover" />
                <Stack align="center" bg="white" py="6" px="3" spacing="18px" textAlign="center">
                  <Text fontWeight="600" fontSize="lg">
                    Thanks for backing <br /> {config?.title}
                  </Text>
                  <Text fontSize="sm">We couldn’t do this without the support of people like you. Share the project with other people who might love what we’re doing.</Text>
                  <FundingSocials justify="center" w="100%" />
                </Stack>
              </Stack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
