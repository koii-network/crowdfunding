import Arweave from "arweave";
import Web3 from "web3";

// TODO: remove TypeScript's any.
declare const window: any;

// Initiate web3.
let web3: any;
if (typeof window.web3 !== undefined) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3(process.env.REACT_APP_INFURA_URL || null);
}

// Initiate Arweave
const arweave = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false
});

export const getEthBalance = async (address: string) => {
  return await web3.eth.getBalance(address, (_: any, balance: any) => {
    return web3.utils.fromWei(balance);
  });
};

export const getArBalance = async (address: string) => {
  return arweave.wallets.getBalance(address).then(balance => {
    return arweave.ar.winstonToAr(balance);
  });
};

export const getBalance = async (address: string, currency: string) => {
  switch (currency) {
    case "eth":
      return await getEthBalance(address);
    case "ar":
      return await getArBalance(address);
    default:
      throw new Error("Currency not supported yet.");
  }
};

export const sendEth = async ({ from, to, amount }: { from?: string; to: string; amount?: number }) => {
  return await web3.eth.sendTransaction({ from, to, value: web3.utils.toWei(String(amount), "ether") });
};

export const sendAr = async ({ to, amount }: { to: string; amount?: number }) => {
  const amountStr = amount?.toString() || "";
  const quantity = arweave.ar.arToWinston(amountStr);
  let transaction = await arweave.createTransaction({
    target: to,
    quantity
  });
  await arweave.transactions.sign(transaction);
  await arweave.transactions.post(transaction);
};

export const sendToken = async ({ from, to, amount, currency }: { from?: string; to: string; amount?: number; currency: string }) => {
  switch (currency) {
    case "eth":
      return await sendEth({
        from,
        to,
        amount
      });
    case "ar":
      return await sendAr({
        to,
        amount
      });
    default:
      throw new Error("Currency not supported yet.");
  }
};

export const getFundContract = (address: string, currency: string) => {
  switch (currency) {
    case "eth":
      return `https://etherscan.io/address/${address}`;
    case "ar":
      return `https://viewblock.io/arweave/address/${address}`;
    default:
      return "#";
  }
};

export const getWalletName = (currency: string) => {
  switch (currency) {
    case "eth":
      return "MetaMask";
    case "ar":
      return "ArConnect";
    default:
      throw new Error("Currency not supported yet.");
  }
};
