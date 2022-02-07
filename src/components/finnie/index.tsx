import React, { ReactNode } from "react";
// api
import { getAddress, getBalances } from "api/sdk";
import { connectToExtension, disconnectExtension, initExtension } from "api/finnie";
// utils
import { toast } from "services/utils";

interface ContextInterface {
  state: any;
  dispatch: any;
}

const Context = React.createContext<ContextInterface | null>(null);
Context.displayName = "FinnieContext";

const actionTypes = {
  changeValue: "CHANGE_VALUE"
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.changeValue:
      const { payload } = action;
      return { ...state, ...payload };
    default:
      throw new Error(`No action type found for finnieReducer`);
  }
};

const initializer = () => {
  return {
    walletAddress: null,
    walletBalance: null,
    isError: false,
    isLoading: false,
    isFinnieConnected: false
  };
};

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, null, initializer);

  /* Helper Functions */
  const connectFinnie = async (isAsync: boolean = false) => {
    let address;
    let balance: any;
    try {
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: true, isError: null, isFinnieConnected: false }
      });
      toast({ title: "Connecting..." });
      // Check if extension exists and get permissions.
      await initExtension();
      // Connect to extension
      await connectToExtension();
      // Get finnie address
      await getAddress().then(async res => {
        if (res.status === 200) {
          /* Done, we have the address */
          address = res?.data;

          await getBalances(res?.data).then(res => {
            balance = res;
          });

          dispatch({
            type: "CHANGE_VALUE",
            payload: { walletAddress: address, isFinnieConnected: true, isLoading: false, isError: null, walletBalance: balance }
          });
          toast({ status: "success", title: "Connected" });
          return balance;
        } else {
          throw new Error("Error getting finnie address!");
        }
      });
    } catch (error: any) {
      toast({ status: "error", title: "Error connecting finnie" });
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: false, isError: error, walletAddress: null, isFinnieConnected: false }
      });
      if (isAsync) {
        throw { message: "Error connecting finnie" };
      }
    }
    return address;
  };
  const disconnectFinnie = async () => {
    // Check if extension exists and get permissions.
    await disconnectExtension();

    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        walletAddress: null,
        walletBalance: null,
        isError: false,
        isLoading: false,
        isFinnieConnected: false
      }
    });
  };

  return <Context.Provider value={{ state: { ...state, connectFinnie, disconnectFinnie }, dispatch }}>{children}</Context.Provider>;
};

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useFinnie must be used inside FinnieProvider`);
  }
  return context;
}

export { ContextProvider as FinnieProvider, useContext as useFinnie };
