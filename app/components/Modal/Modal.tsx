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
 * @param ref ref used for useCloseMenuOnOutsideClick
 */
const Modal = React.forwardRef<HTMLElement, ModalProps>((props, ref) => {
  Modal.displayName = 'Modal';
  // Setting up a portal to show Modals outside root element
  const portal = document.getElementById('portal') as HTMLElement;
  const { stateValue, setter, children } = props;
  const lineStyle = 'modal h-0.5 w-5 rounded-full bg-orange-primary';
  return ReactDOM.createPortal(
    <div className="fixed z-10 top-0 w-screen h-screen bg-black/50">
      <section
        className="relative w-5/6 max-w-lg mt-[25vh] mx-auto p-8 pt-10 rounded-xl bg-dark-gray"
        ref={ref}>
        <button
          className="modal absolute top-4 right-4 w-4 h-4 hover:scale-105"
          onClick={() => setter(!stateValue)}>
          <div className={lineStyle + ' rotate-45 translate-y-0.5'} />
          <div className={lineStyle + ' -rotate-45'} />
        </button>
        {children}
      </section>
    </div>,
    portal
  );
});

export default Modal;
