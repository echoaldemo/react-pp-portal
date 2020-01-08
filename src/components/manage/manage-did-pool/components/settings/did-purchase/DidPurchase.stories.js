import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import DidPurchase from "./DidPurchase";
import { Dialog } from "@material-ui/core";
import SuccessModal from "../../../../common-components/success-modal/SuccessModal";
import Successful from "./successful";
const stories = storiesOf("Did Purchase dialog", module);

stories.add("default", () =>
  createElement(() => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = () => {
      console.log("deleting");
    };

    return (
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DidPurchase header="Buy DID number" closeFn={handleClose} />
      </Dialog>
    );
  })
);

stories.add("order success", () =>
  createElement(() => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleBtn = () => {
      console.log("deleting");
    };

    return (
      <Dialog open={open}>
        <SuccessModal
          text={"Your order has been placed succesfully"}
          qty={200}
          subtitle={
            "We are processing your order. This could take up to one hour. You will receive a confirmation email when the process is done."
          }
          btnText={"BUY ANOTHER"}
          closeFn={handleClose}
          btnFn={handleBtn}
        />
      </Dialog>
    );
  })
);

stories.add("Success with errors", () =>
  createElement(() => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleBtn = () => {
      console.log("deleting");
    };

    const dids = [
      {
        number: "(406) 262-8717",
        purchased: true
      },
      {
        number: "(406) 262-8718",
        purchased: true
      },
      {
        number: "(406) 262-8719",
        purchased: true
      },
      {
        number: "(406) 262-8720",
        purchased: false
      },
      {
        number: "(406) 262-8721",
        purchased: true
      },
      {
        number: "(406) 262-8722",
        purchased: true
      },
      {
        number: "(406) 262-8723",
        purchased: false
      },
      {
        number: "(406) 262-8724",
        purchased: false
      }
    ];

    return (
      <Dialog open={open}>
        <Successful
          text={"Your order has been placed succesfully"}
          dids={dids}
          subtitle={"Some dids were not bought because they are already taken."}
          btnText={"BUY ANOTHER"}
          error={true}
          closeFn={handleClose}
          btnFn={handleBtn}
        />
      </Dialog>
    );
  })
);
