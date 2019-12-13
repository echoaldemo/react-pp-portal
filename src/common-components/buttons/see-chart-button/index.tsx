import React from "react";
import styled from "styled-components";
import { FaChartBar } from "react-icons/fa";

/**
 * ==============================================================================
 * <SeeChartButton />
 * ------------------------------------------------------------------------------
 * @param {string}    mode       Button mode (sales/bills)
 * @param {Function}  handleClick    Triggers OnClick Event
 * @return {ReactElement}
 * ==============================================================================
 */

interface Props {
  handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  mode?: string;
}

const defaultProps = {
  mode: "sales",
  handleClick: () => console.log("See chart...")
};

const SeeChartButton: React.FC<Props> = ({ mode, handleClick, ...rest }) => {
  const renderSales: Function = () => {
    return (
      <>
        <Sale onClick={handleClick} {...rest}>
          <SaleText>
            <Chart2 />
            See chart
          </SaleText>
        </Sale>
      </>
    );
  };

  const renderBills: Function = () => {
    return (
      <>
        <Bill onClick={handleClick} {...rest}>
          <BillText>
            <Chart1 />
            See chart
          </BillText>
        </Bill>
      </>
    );
  };

  return mode === "sales"
    ? renderSales()
    : mode === "bills"
    ? renderBills()
    : null;
};

SeeChartButton.defaultProps = defaultProps;

const Sale = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`;
const SaleText = styled.span`
  font-size: 16px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;
const Bill = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
const BillText = styled.span`
  font-size: 16px;
  color: #50555a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  text-decoration: underline;
`;
const Chart1 = styled(FaChartBar)`
  color: #f89523;
  margin-right: 8px;
`;
const Chart2 = styled(FaChartBar)`
  color: white;
  margin-right: 8px;
`;

export default SeeChartButton;
