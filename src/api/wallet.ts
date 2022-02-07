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

export const connectToWallet = async (currency: string) => {
  switch (currency) {
    case "eth":
      return await connectToMetaMask();
    case "ar":
      return await connectToArConnect();
    default:
      throw new Error("Currency not supported yet");
  }
};
