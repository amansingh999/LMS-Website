import { toast } from 'react-toastify';
const CustomToast = ({ message, cssClass, icon }) => {
  return (
    <div className={`custom-toast-container ${cssClass}`}>
      {/* <img src={icon ? icon : Svg.correctImg} alt="" /> */}
      <span className='success_text'>{message}</span>
    </div>
  );
};

export const toaster = (type, msg, heading) => {
  const text = msg || 'Something went wrong !';
  switch (type) {
    case 'success':
      toast.success(<CustomToast message={text} cssClass='toast-success' />, {
        position: 'bottom-right',
        type: 'success',
        autoClose: 2000,
      });
      break;
    case 'error':
      toast.error(<CustomToast message={text} cssClass='toast-error' />, {
        position: 'bottom-right',
        type: 'error',
        autoClose: 2000
      });
      break;
    case 'warn':
      toast.warn(<CustomToast message={text} cssClass='toast-error' />, {
        position: 'bottom-right',
        type: 'error',
        autoClose: 2000
      });
      break;
    case 'info':
      toast.info(<CustomToast message={text} cssClass='toast-info' />, {
        position: 'bottom-right',
        type: 'success',
        autoClose: 2000
      });
      break;
    default:
      toast.info(<CustomToast message={text} cssClass='toast-info' />, {
        position: 'bottom-right',
        type: 'success',
        autoClose: 2000
      });
  }
};
