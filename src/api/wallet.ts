import { connectToExtension, initExtension } from "./finnie";
import { getAddress } from "./sdk";

export const connectToMetaMask = async () => {
  if (typeof window.ethereum !== "undefined") {
    /* MetaMask is installed */
    let address = null;
    await window.ethereum.request({ method: "eth_requestAccounts" }).then(async (ethAddrArr: string) => {
      if (!ethAddrArr || !ethAddrArr[0]) {
        throw new Error("no_accounts");
      }
      address = ethAddrArr[0];
    });
    return { address };
  } else {
    /* MetaMask is not installed */
    throw new Error("extension_not_installed");
  }
};

export const connectToArConnect = async () => {
  if (typeof window.arweaveWallet !== "undefined") {
    /* ArConnect is installed */
    let address = null;
    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"], { name: "KOII", logo: "https://koii-x.vercel.app/static/media/logo.59dc7758.png" });
    address = await window.arweaveWallet.getActiveAddress();
    return { address };
  } else {
    /* ArConnect is not installed */
    throw new Error("extension_not_installed");
  }
};

export const connectToFinnie = async () => {
  try {
    let address = null;
    // Check if extension exists and get permissions.
    await initExtension();
    // Connect to extension
    await connectToExtension();
    // Get finnie address
    await getAddress().then(async res => {
      if (res.status === 200) {
        address = res?.data;
      } else {
        throw new Error("Error getting finnie address!");
      }
    });
    return { address };
  } catch (error) {
    throw new Error("error_connecting_to_finnie");
  }
};

export const connectToWallet = async (wallet: string) => {
  switch (wallet) {
    case "metamask":
      return await connectToMetaMask();
    case "arconnect":
      return await connectToArConnect();
    case "finnie":
      return await connectToFinnie();
    default:
      throw new Error("Wallet not supported yet");
  }
};
