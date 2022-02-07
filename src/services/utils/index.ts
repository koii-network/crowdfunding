import { createStandaloneToast } from "@chakra-ui/toast";
// chakra theme
import { theme } from "App/theme";

export const sleep = (t: number = 300) => new Promise(resolve => setTimeout(resolve, t));

export const formatDigitNumber = (val: any, options?: any) => {
  if (typeof val !== "number") return 0;
  if (val) return val.toLocaleString("en-US", { maximumFractionDigits: 2, ...options });
  else return 0;
};

export const parseString = (x: string, base?: any) => {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

/**
 *
 * @param {Function} fn Function to poll for result
 * @param {Number} timeout How long to poll for
 * @param {Number} interval Polling interval
 * @returns {Promise}
 */
export const poll = (fn: any, timeout: any, interval: any) => {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  var checkCondition = function (resolve: any, reject: any) {
    // If the condition is met, we're done!
    var result = fn();
    if (result) {
      resolve(result);
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error("timed out for " + fn + ": " + arguments));
    }
  };

  return new Promise(checkCondition);
};

// Toast
const toastId = "koi-toast";
const headlessToast = createStandaloneToast({
  defaultOptions: {
    title: "Loading...",
    isClosable: true,
    duration: 2000,
    status: "info",
    position: "top-right",
    description: null,
    id: toastId
  },
  theme: theme
});

interface ToastProps {
  title?: string;
  isClosable?: boolean;
  duration?: number;
  status?: any;
  variant?: string;
  position?: any;
  description?: any;
  closeAll?: () => void;
}

export const toast = ({ title = "Loading...", isClosable = true, duration = 3000, status = "info", variant = "left-accent", position = "top-right", description = null }: ToastProps) => {
  let newToast: any;
  if (!headlessToast.isActive(toastId)) {
    newToast = headlessToast({
      title,
      description,
      status,
      duration,
      isClosable,
      position,
      variant,
      id: toastId
    });
  } else {
    newToast = headlessToast.update(toastId, { title, description, status, duration, isClosable, position, variant });
  }

  return newToast;
};

export const convertToAr = (balance: any) => {
  if (!balance) return "...";
  let value = Number(balance);
  return (value / 1000000000000)?.toFixed?.(8);
};

/**
 * Format a timestamp to a local date
 * @param {string} timestamp unix timestamp
 * @param {object} options .toLocaleString() options
 * @returns formatted local date
 */
export const formatUnixTimestamp = (
  timestamp: string,
  options: Record<string, any> = {
    day: "numeric",
    month: "short",
    year: "numeric"
  }
) => {
  if (!timestamp) return null;
  return new Date(parseInt(timestamp) * 1000).toLocaleString(undefined, options);
};

export const refreshPage = () => {
  window?.location.reload();
};
