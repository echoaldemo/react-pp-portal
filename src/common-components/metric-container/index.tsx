import React from "react";
import { IoIosSettings } from "react-icons/io";
import { ButtonWithIcon } from "common-components";
import { Card, Header, HeaderText, Content } from "./style";

interface Props {
  icon?: React.ReactNode;
  header?: string;
  editFn: () => void;
  children?: React.ReactNode;
}

const MetricContainer: React.FC<Props> = ({
  icon,
  header,
  children,
  editFn
}) => {
  return (
    <Card>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon}
          <HeaderText>{header}</HeaderText>
        </div>
        <ButtonWithIcon
          handleClick={editFn}
          style={{ marginLeft: "auto" }}
          icon={<IoIosSettings />}
        >
          Edit metrics
        </ButtonWithIcon>
      </Header>
      <Content>{children}</Content>
    </Card>
  );
};

MetricContainer.defaultProps = {
  header: "",
  editFn: () => {}
} as Partial<Props>;

export { MetricContainer };
