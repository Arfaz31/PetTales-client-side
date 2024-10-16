import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const NewsFeedLayout = ({ children }: TProps) => {
  return (
    <div>
      leftsidebar
      <div>{children}</div>
      rightsidebar
    </div>
  );
};

export default NewsFeedLayout;
