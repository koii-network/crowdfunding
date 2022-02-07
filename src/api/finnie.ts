// utils
import { poll, sleep } from "services/utils";

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

export const initExtension = async () => {
  try {
    // Does it exist?
    let extensionObj: any = await poll(() => window.koiiWallet, 1000, 200);
    // Is it connected?
    let res = await extensionObj.getPermissions();

    if (res.status === 200 && res.data.length) return true;
    else return false;
  } catch (error) {
    // Have to throw error to trigger rejected
    throw new Error("Extension does not exist");
  }
};

export const connectToExtension = async () => {
  try {
    const extension = window.koiiWallet;
    let res = await extension.connect();

    if (res.status === 200) return true;

    throw new Error(res?.data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const disconnectExtension = async () => {
  try {
    await window?.koiiWallet?.disconnect();
    return true;
  } catch (error) {}
};

export const sendKoiiTip = async (artistAddress: string, amount: number) => {
  const extension = window.koiiWallet;
  return await extension.sendKoii(artistAddress, amount);
};
