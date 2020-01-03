import React from "react";

const HeaderContainer = ({ children, style }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default HeaderContainer;
