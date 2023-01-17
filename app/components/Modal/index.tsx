import ReactDOM from 'react-dom';
import { animated, useTransition, useTrail } from '@react-spring/web';
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
const Modal = (props: ModalProps) => {
  // Setting up a portal to show Modals outside root element
  const portal = document.getElementById('portal') as HTMLElement;
  const { children, stateValue, setter } = props;
  const handleCloseModal = (e: React.MouseEvent) => {
    console.log(e);
    setter(!stateValue);
  };
  const lineStyle = 'modal h-0.5 w-5 rounded-full bg-orange-primary';
  // Animation section
  const trail = useTrail(
    1, {
      config: { mass: 1, tension: 300, friction: 36 },
      from: { opacity:0, y:-100 },
      to: { opacity:100, y:0 },
    }
  );
  return ReactDOM.createPortal(
    <div className="fixed z-0 top-0 w-screen h-screen">
      <div className='fixed z-10 top-0 w-screen h-screen bg-black/50' onClick={handleCloseModal}/>
      <>
        {
          trail.map((props, index) =>
            (
              <animated.section
              // style={style}
                style={props}
                key={index}
                className="relative z-50 w-5/6 max-w-lg mt-[25vh] mx-auto p-8 pt-10 rounded-xl bg-dark-gray"
              >
                <button
                  className="modal absolute top-4 right-4 w-4 h-4 hover:scale-105"
                  onClick={handleCloseModal}>
                  <div className={lineStyle + ' rotate-45 translate-y-0.5'} />
                  <div className={lineStyle + ' -rotate-45'} />
                </button>
                {children}
              </animated.section>
            ))
        }
      </>
    </div>,
    portal
  );
};

export default Modal;
