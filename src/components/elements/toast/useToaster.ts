import { toast } from "react-toastify";

export function useToaster(duration: number = 1500) {
    const conf: object = {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: true,
    };

    const success = (message: string) => {
        toast.success(message, conf)
    }
    const info = (message: string) => {
        toast.info(message, conf)
    }
    const error = (message: string) => {
        toast.error(message, conf)
    }
    const warn = (message: string) => {
        toast.warn(message, conf)
    }
    return {
        success,
        info,
        error,
        warn
    }
}