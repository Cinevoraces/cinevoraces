import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface HTMLInputEvent extends ChangeEvent{
  target: HTMLInputElement & EventTarget;
}

interface FileProps{
  fileSetter: Dispatch<SetStateAction<File | undefined>>;
}

/**
 * 
 * @param fileSetter state setter for selected file 
 * @returns <label> with file <input> inside it
 */
const File = ({ fileSetter }: FileProps) => {
  const style = `block w-full px-3 py-2 flex 
    bg-medium-gray border border-transparent ring ring-transparent rounded-lg 
    text-sm text-light-white font-light
    cursor-pointer 
    focus:outline-none focus:border-orange-primary focus:ring-4 focus:ring-white/5
    transition duration-150 hover:ease-out `;
  return (
    <>
      <label
        htmlFor="file_upload"
        className="-mb-5">
        Téléverser une nouvelle image de profil
      </label>
      <input
        type="file"
        id="file_upload"
        className={style}
        onChange={(e: HTMLInputEvent) => {
          if (e.target.files){
            fileSetter(e.target.files[0]);
          }
        }}
      />
    </>
  );
};

export default File;
