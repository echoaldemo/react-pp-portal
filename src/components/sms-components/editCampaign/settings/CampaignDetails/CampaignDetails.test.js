import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CampaignDetails from "./CampaignDetails";
import LoaderDialog from "../common-components/LoaderDialog";
import Textfield from "../common-components/Textfield";
import SnackBar from "../common-components/SnackBar";

// Test 1:
// The component displays all textfields, select fields and checkbox.

// Test 2:
// The component displays all the  menu items

// Test 3:
// The loader dialog opens up when performing action on fields

// Test 4:
// This component renders the toast bar after performing an action on fields

afterEach(cleanup);

describe("<CampaignDetails />", () => {
  it("Displays all fields", () => {
    const { getByLabelText } = render(<CampaignDetails />);
    const name = getByLabelText(/Campaign Name/i);
    const longTransfer = getByLabelText(/Long Transfer/i);
    const closeLead = getByLabelText(/Close lead after being on a/i);
    const closeDuration = getByLabelText(/Close duration/i);
    const revenue = getByLabelText(/Revenue per conversion/i);
    const setLongTransfers = getByLabelText(
      /Automatically set long transfers as converted/i
    );
    const repostRules = getByLabelText(/Repost rules/i);

    expect(
      name,
      longTransfer,
      closeLead,
      closeDuration,
      revenue,
      setLongTransfers,
      repostRules
    ).toBeInTheDocument();
  });

  it("opens up the loader dialog when field value changed and dialog value is 'true' ", () => {
    const { getByLabelText } = render(<CampaignDetails />);
    const { getByTestId } = render(<LoaderDialog open={true} />);
    const name = getByLabelText(/Campaign Name/i);
    const longTransfer = getByLabelText(/Long Transfer/i);
    const closeLead = getByLabelText(/Close lead after being on a/i);
    const closeDuration = getByLabelText(/Close duration/i);
    const revenue = getByLabelText(/Revenue per conversion/i);
    const setLongTransfers = getByLabelText(
      /Automatically set long transfers as converted/i
    );
    const repostRules = getByLabelText(/Repost rules/i);

    name.value = "new";
    fireEvent.change(name);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    longTransfer.value = "new";
    fireEvent.change(longTransfer);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    closeLead.value = "new";
    fireEvent.change(closeLead);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    closeDuration.value = "new";
    fireEvent.change(closeDuration);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    revenue.value = "1000";
    fireEvent.change(revenue);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    setLongTransfers.value = !setLongTransfers.value;
    fireEvent.change(setLongTransfers);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();

    repostRules.value = "new";
    fireEvent.change(repostRules);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();
  });

  it("display menu items", () => {
    const fakeItemsList = [
      { id: 1, name: "item1" },
      { id: 2, name: "item2" },
      { id: 3, name: "item3" }
    ];

    const { getAllByTestId, getByTestId } = render(
      <Textfield values={fakeItemsList} input={fakeItemsList[0].name} />
    );
    const longtransfer = getByTestId("textfield");
    fireEvent.click(longtransfer);
    const menuItems = getAllByTestId("menu").map(
      menuItem => menuItem.textContent
    );
    const fakeItems = fakeItemsList.map(list => list.name);
    expect(menuItems).toEqual(fakeItems);
  });

  it("renders the toast bar after performing a success action on fields and snackbar value is 'true' ", () => {
    const { getByLabelText } = render(<CampaignDetails />);
    const { getByTestId } = render(<SnackBar open={true} />);
    const name = getByLabelText(/Campaign Name/i);
    const longTransfer = getByLabelText(/Long Transfer/i);
    const closeLead = getByLabelText(/Close lead after being on a/i);
    const closeDuration = getByLabelText(/Close duration/i);
    const revenue = getByLabelText(/Revenue per conversion/i);
    const setLongTransfers = getByLabelText(
      /Automatically set long transfers as converted/i
    );
    const repostRules = getByLabelText(/Repost rules/i);

    name.value = "new";
    fireEvent.change(name);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    longTransfer.value = "new";
    fireEvent.change(longTransfer);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    closeLead.value = "new";
    fireEvent.change(closeLead);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    closeDuration.value = "new";
    fireEvent.change(closeDuration);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    revenue.value = "1000";
    fireEvent.change(revenue);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    setLongTransfers.value = !setLongTransfers.value;
    fireEvent.change(setLongTransfers);
    expect(getByTestId("snackbar")).toBeInTheDocument();

    repostRules.value = "new";
    fireEvent.change(repostRules);
    expect(getByTestId("snackbar")).toBeInTheDocument();
  });
});
