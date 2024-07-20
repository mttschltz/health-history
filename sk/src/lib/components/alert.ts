import Alert from "$lib/components/Alert.svelte";
import { toast } from "@zerodevx/svelte-toast";

export function alertSuccess(message: string) {
  toast.push(message, {
    component: {
      sendIdTo: "id",
      // @ts-expect-error
      src: Alert,
      props: { type: "success", text: message },
    },
    theme: {
      "--toastBackground": "none",
      "--toastBorder": "none",
      "--toastBoxShadow": "0",
      "--toastBarHeight": 0,
      "--toastBtnWidth": 0,
      "--toastBtnHeight": 0,
      "--toastBtnContent": "",
    },
  });
}

export function alertInfo(message: string) {
  toast.push(message, {
    component: {
      sendIdTo: "id",
      // @ts-expect-error
      src: Alert,
      props: { type: "info", text: message },
    },
    theme: {
      "--toastBackground": "none",
      "--toastBorder": "none",
      "--toastBoxShadow": "0",
      "--toastBarHeight": 0,
      "--toastBtnWidth": 0,
      "--toastBtnHeight": 0,
      "--toastBtnContent": "",
    },
  });
}

export function alertWarning(message: string) {
  toast.push(message, {
    component: {
      sendIdTo: "id",
      // @ts-expect-error
      src: Alert,
      props: { type: "warning", text: message },
    },
    theme: {
      "--toastBackground": "none",
      "--toastBorder": "none",
      "--toastBoxShadow": "0",
      "--toastBarHeight": 0,
      "--toastBtnWidth": 0,
      "--toastBtnHeight": 0,
      "--toastBtnContent": "",
    },
  });
}

export function alertError(message: string) {
  toast.push(message, {
    component: {
      sendIdTo: "id",
      // @ts-expect-error
      src: Alert,
      props: { type: "error", text: message },
    },
    theme: {
      "--toastBackground": "none",
      "--toastBorder": "none",
      "--toastBoxShadow": "0",
      "--toastBarHeight": 0,
      "--toastBtnWidth": 0,
      "--toastBtnHeight": 0,
      "--toastBtnContent": "",
    },
  });
}
