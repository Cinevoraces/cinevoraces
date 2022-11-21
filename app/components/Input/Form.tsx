import React, { useState } from 'react';

interface FormProps{
  children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
  const [isRequired, setIsRequired] = useState(false);
  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        !isRequired && setIsRequired(true);
      }}
      className="flex flex-col w-full gap-3">
      {children}
    </form>);
}
