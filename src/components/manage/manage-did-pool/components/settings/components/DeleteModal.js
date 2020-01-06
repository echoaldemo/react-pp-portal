import React from "react";
import DelModal from "../../../../common-components/delete-modal/DeleteModal";
import { Dialog } from "@material-ui/core";

export default function DeleteModal(props) {
  return (
    <div>
      <Dialog open={props.open}>
        <DelModal
          header="Delete DID"
          msg="DID"
          name={props.did ? props.did.name : ""}
          closeFn={() => props.closeFn()}
          delFn={() => props.delFn()}
        />
      </Dialog>
    </div>
  );
}
