import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export function ToggleProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  return useContext(ToggleContext);
}
