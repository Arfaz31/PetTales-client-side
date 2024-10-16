import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: TProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default SidebarLayout;
