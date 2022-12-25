
import './Button.css'
import React from 'react';

interface IButtonProps{
    children?: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
    hasIconOnly?: boolean
}

const Button: React.FC<IButtonProps> = ({
  children,
  type = 'button',
  hasIconOnly = false,
  ...props
}) => {
  const classNames = () =>{
    let className = '';
    if(hasIconOnly){
      className +='has-icons'
    }   
    return className;
  }
  return (
    <button className={classNames()} type={type} {...props}>

      {children}
    </button>
  )};

export default Button;