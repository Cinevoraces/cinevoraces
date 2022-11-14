import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  stateValue: boolean;
  setter(value: boolean): void;
  children: React.ReactNode;
}

/**
 * @returns modal template for misc purposes
 * @param stateValue open status
 * @param setter state mutator to toggle on / off
 * @param children content of the modal
 */
export default function Modal(props: ModalProps) {
  // Setting up a portal to show Modals outside root element
  const portal = document.getElementById('portal') as HTMLElement;
  const { stateValue, setter, children } = props;
  const lineStyle = 'modal h-0.5 w-5 rounded-full bg-white';
  return ReactDOM.createPortal(
    <div className='fixed top-0 w-screen h-screen bg-gray-900/30'>
      <button className=''>
        <div className={lineStyle + ' rotate-45 translate-y-2'} />
        <div className={lineStyle + ' -rotate-45 -translate-y-2'} />
      </button>
      {children}
    </div>,
    portal
  );
}
