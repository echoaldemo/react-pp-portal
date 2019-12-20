import React from "react";
import Routes from "./Routes";

const MainView = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Routes />
    </>
  );
};

export default MainView;
