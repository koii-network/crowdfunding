import React from "react";
import config from "config/funding-config";

interface ConfigInterface {
  title: string;
  companyName: string;
  fundGoal: number;
  images: Array<{ src: string }>;
  socials: Record<string, string | null>;
  paymentType: string | "eth" | "ar";
  fundAddress: string;
  about: JSX.Element;
  faqs?: Array<{ question: string; answer: string }>;
  nfts: Array<Record<string, any>>;
}

const defaultConfig: ConfigInterface = config;

interface ContextInterface {
  state: {
    config: ConfigInterface;
    fundModal: {
      isOpen: boolean;
      step: "select-payment" | "connect-wallet" | "success" | "error" | string;
      paymentType?: "token-only";
      tokenAmount?: number;
      isWalletConnected: boolean;
      walletAddress?: string;
      walletType?: "metamask" | "arconnect" | "finnie";
    };
  };
  dispatch: React.Dispatch<ActionType>;
}

const initialState = {
  config: defaultConfig,
  fundModal: {
    isOpen: false,
    step: "select-payment",
    isWalletConnected: false
  }
};

type ActionType =
  | { type: "CHANGE_FIELDS"; payload: Record<string, any> }
  | { type: "TOGGLE_FUND_MODAL" }
  | { type: "CLOSE_FUND_MODAL" }
  | { type: "CHANGE_MODAL_FIELDS"; payload: Record<string, any> };

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_FIELDS":
      return { ...state, ...action?.payload };
    case "TOGGLE_FUND_MODAL":
      return {
        ...state,
        fundModal: {
          ...state.fundModal,
          isOpen: !state?.fundModal?.isOpen,
          step: "select-payment"
        }
      };
    case "CLOSE_FUND_MODAL":
      return {
        ...state,
        fundModal: {
          ...state.fundModal,
          isOpen: false,
          step: "select-payment",
          tokenAmount: undefined,
          walletType: undefined
        }
      };
    case "CHANGE_MODAL_FIELDS":
      return {
        ...state,
        fundModal: {
          ...state.fundModal,
          ...action?.payload
        }
      };
    default:
      throw new Error(`No action type found for fundingReducer`);
  }
};

const Context = React.createContext<ContextInterface | null>({
  state: initialState,
  dispatch: () => null
});

const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

function useContext() {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error(`useFunding must be used inside FundingProvider`);
  }
  return context;
}

export { ContextProvider as FundingProvider, useContext as useFunding };
