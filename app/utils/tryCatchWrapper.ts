import { toast } from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFunction = (...args: any[])=>Promise<any>;
type TryCatchWrapper<F extends GenericFunction> = (
  ...args: Parameters<F>
)=>ReturnType<F>;

const tryCatchWrapper = (func: GenericFunction): TryCatchWrapper<GenericFunction> => {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message) toast.error(err.message);
      return;
    }
  };
};

export default tryCatchWrapper;
