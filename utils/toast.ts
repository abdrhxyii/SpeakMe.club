import { toast } from "burnt"; 

type ToastOptions = {
  title?: string; 
  message?: string;
  preset?: "done" | "error" | "none";
  duration?: number; 
};

export const showToast = ({ title = "", message, preset = "none", duration = 2 }: ToastOptions) => {
  toast({
    title,
    message,
    preset,
    duration,
  });
};
