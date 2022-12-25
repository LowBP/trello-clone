import { useEffect, useState } from 'react';
import './Toast.css';
interface IProps{
    text: string;
    isShow: boolean;
    toastType: ToastType,
    onClose: () => void;
}

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

function Toast(props: IProps) {
  const [showClassName, setShowClassName] = useState<string>('');

  useEffect(() => {
    if(props.isShow){
      setShowClassName(`show ${props.toastType}`)
      setTimeout(function(){
        setShowClassName('');
        props.onClose();
      }, 3000);
    }
  }, [props.isShow]);
      
  return (<div id='toast' className={showClassName}>{props.text}</div>);
}

export default Toast;