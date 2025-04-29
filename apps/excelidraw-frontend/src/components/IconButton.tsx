import { ReactNode } from "react";

interface IconButtonProp {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}

export const IconButton = ({ icon, onClick, activated }: IconButtonProp) => {
  return (
    <div
      className={`pointer rounded-lg  p-2 ${activated ? "bg-stone-700" : ""}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
