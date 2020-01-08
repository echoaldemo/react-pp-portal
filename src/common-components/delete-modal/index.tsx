import React, { useState } from "react";
import * as Styled from "./styles";

interface Props {
  open: boolean;
  header?: string;
  msg?: string;
  name: string;
  closeFn: () => void;
  delFn: () => void;
}

const DeleteModal: React.FC<Props> = ({
  open,
  header,
  msg,
  name,
  closeFn,
  delFn
}) => {
  const [val, setVal] = useState("");
  const [ok, setOk] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (e.target.value === name) {
      setOk(true);
    } else {
      setOk(false);
    }
  };

  const closeModal = () => {
    closeFn();
    setVal("");
  };

  return (
    <Styled.Center open={open} onClose={closeModal}>
      <Styled.Box>
        <Styled.Header>
          <Styled.CenterText>{header}</Styled.CenterText>
          <Styled.CloseIcon onClick={closeModal} />
        </Styled.Header>
        <Styled.Content>
          <Styled.Text>Are you sure you want to delete this {msg}?</Styled.Text>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Text2>
            <strong>{name}</strong> will be removed from all servers. Confirm by
            entering the {msg} name into the input.
          </Styled.Text2>
          <Styled.InputField
            label={name}
            margin="normal"
            value={val}
            onChange={handleChange}
            data-cy="del-field"
          />
          {ok ? (
            <Styled.DelBtn onClick={delFn} id="delBtn">
              <Styled.DelBtnText>
                <Styled.Trash />
                Delete
              </Styled.DelBtnText>
            </Styled.DelBtn>
          ) : (
            <Styled.DisBtn disabled>
              <Styled.DelBtnText>
                <Styled.Trash />
                Delete
              </Styled.DelBtnText>
            </Styled.DisBtn>
          )}
        </Styled.Content>
      </Styled.Box>
    </Styled.Center>
  );
};

DeleteModal.defaultProps = {
  header: "",
  msg: "",
  name: ""
} as Partial<Props>;

export { DeleteModal };
