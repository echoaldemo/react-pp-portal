import React from "react";
import { Sale, SaleText, Bill, BillText, Chart1, Chart2 } from "../styles";

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

export default SeeChartButton;
