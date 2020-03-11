import React from "react";
import { TableNoResult, SaveButton, AlertModal } from "common-components";
import { Add } from "@material-ui/icons";
import {
  Button
} from "@material-ui/core/";

export default function Variables() {
  const [open, setOpen] = React.useState(false);

  // const handleDisplayModal = () => setOpen(!open);

  const addVarModal = () => {
    return <>
      <AlertModal open={open} severity={'info'} message={'Informative text for example…'} handlerClickBtn={() => setOpen(!open)} />
    </>;
  }

  return (
    <div className="c-default">
      <TableNoResult
        headerText="Pitch Variables"
        mainMessage="No pitch variables have been created"
        subMessage="Would you like to creat one? Just hit the “New Variable” button."
        renderButton={
          <SaveButton
            onClick={() => {
              alert("Clicked");
            }}
          >
            <Add />
            New Variable
          </SaveButton>
        }
      />
    </div>
  );
}

// export default variables;