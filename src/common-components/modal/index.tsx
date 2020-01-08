import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface ModalProps {
  open: boolean;
  width?: number;
  height?: number;
  onClose: () => void;
  title: React.ReactNode;
  contentStyle?: object;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  width,
  height,
  onClose,
  title,
  contentStyle,
  children
}) => {
  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={open}
        PaperProps={{
          square: true,
          style: {
            minWidth: width ? width : 420,
            minHeight: height ? height : "auto",
            maxWidth: width ? width : 420,
            maxHeight: height ? height : "auto"
          }
        }}
        onClose={() => {
          onClose();
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: "#5f7d98",
            color: "#FFF",
            padding: 10
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ width: 30 }}>&nbsp;</div>
            <div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 550
                }}
              >
                {title}
              </span>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  onClose();
                }}
              >
                <CloseIcon style={{ color: "#FFF" }} />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{ ...contentStyle, overflow: "hidden" }}>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

Modal.defaultProps = {
  title: "Test Title!",
  open: false
} as Partial<ModalProps>;

export { Modal };
