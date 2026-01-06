// import React, { useState } from "react";

interface ModalProps {
  open: boolean;
  setopen: () => void;
  message: string;
  callback: () => void;
}
const Modal = ({ message, callback,open,setopen }: ModalProps) => {
  return (
    <div className="fixed h-fit py-2 px-1 top-[50%] left-[50%]">
      <section>{message}</section>
      <section>
        <button onClick={callback}>Ok</button>
        <button>Cancel</button>
      </section>
    </div>
  );
};

export default Modal;
