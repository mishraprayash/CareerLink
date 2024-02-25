
import { toast } from 'react-toastify';
export const ToastMessage = (flag, message) => {
   console.log(flag, message)
   if (flag === 'Success') {
      toast.success(message, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
   } else if (flag === 'Error') {
      toast.error(message, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
   } else if (flag === 'Warning') {
      toast.warn(message, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
   }
   else {
      console.log(`${message}, This message can't be displayed using react-toastify!`);

   }
}