import ReactDOM from 'react-dom';
import { forwardRef } from 'react';
import { animated, useTransition } from '@react-spring/web';
interface ModalProps {
  stateValue: boolean;
  setter(value: boolean): void;
  children: React.ReactNode;
}

const AnimatedModalCanvas = forwardRef<HTMLElement, ModalProps>((props, ref) => {
  AnimatedModalCanvas.displayName = 'AnimatedModalCanvas';
  const { stateValue, setter, children } = props;
  const lineStyle = 'modal h-0.5 w-5 rounded-full bg-orange-primary';
  const transitions = useTransition(props, {
    from: { opacity: 0, transform: 'translateY(-50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
  });
  return transitions((style, item) => (
    item && <div className="fixed z-50 top-0 w-screen h-screen bg-black/50">
      <animated.section 
        style={style} 
        className="relative w-5/6 max-w-lg mt-[25vh] mx-auto p-8 pt-10 rounded-xl bg-dark-gray"
        ref={ref}>
        <button
          className="modal absolute top-4 right-4 w-4 h-4 hover:scale-105"
          onClick={() => setter(!stateValue)}>
          <div className={lineStyle + ' rotate-45 translate-y-0.5'} />
          <div className={lineStyle + ' -rotate-45'} />
        </button>
        {children}
      </animated.section>
    </div>
  ));
});

/**
 * @returns modal template for misc purposes
 * @param stateValue open status
 * @param setter state mutator to toggle on / off
 * @param children content of the modal
 * @param ref ref used for useCloseMenuOnOutsideClick
 */
const Modal = forwardRef<HTMLElement, ModalProps>((props, ref) => {
  Modal.displayName = 'Modal';
  // Setting up a portal to show Modals outside root element
  const portal = document.getElementById('portal') as HTMLElement;
  const { children } = props;
  return ReactDOM.createPortal(
    <AnimatedModalCanvas
      {...props}
      ref={ref}>
      {children}
    </AnimatedModalCanvas>,
    portal
  );
});

export default Modal;
