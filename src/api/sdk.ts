// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export const getAddress = async () => {
  const extension = window.koiiWallet;
  try {
    let res = await extension.getAddress();
    if (res) return res;
    else throw new Error(res.data);
  } catch (error: any) {
    // If we get here it's most likey user uninstalled extension and re-installed
    // Very edgy edge-case, but better to handle than not
    extension?.disconnect();
    throw new Error(error);
  }
};

export const getBalances = async (walletAddress: any) => {
  let koii: any;
  let ar: any;
  try {
    await koiSDK.setWallet(walletAddress);
    koii = await koiSDK.getKoiBalance();
    ar = await koiSDK.getWalletBalance();
    return { koii, ar };
  } catch (error) {}
};
