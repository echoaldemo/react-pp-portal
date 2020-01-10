import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DeliverySettings from "./DeliverySettings";
import LoaderDialog from "../common-components/LoaderDialog";
import SnackBar from "../common-components/SnackBar";

afterEach(cleanup);

describe("<DeliverySettings />", () => {
  it("Display all fields", () => {
    const { getByText } = render(<DeliverySettings />);
    const leads = getByText("Leads per day");
    expect(leads).toBeInTheDocument();
    const deliveryType = getByText("Delivery type");
    expect(deliveryType).toBeInTheDocument();
    const transfers = getByText("Concurrent transfers");
    expect(transfers).toBeInTheDocument();
    const maxcps = getByText("Max CPS");
    expect(maxcps).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the leads per day field and display snackbar afterwards", () => {
    const { getByText } = render(<DeliverySettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const leads = getByText("Leads per day");
    fireEvent.blur(leads);
    leads.value = "data";
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the delivery type field and display snackbar afterwards", () => {
    const { getByText } = render(<DeliverySettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const deliveryType = getByText("Delivery type");
    fireEvent.change(deliveryType);
    deliveryType.value = "delType";
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the concurrent transfers field and display snackbar afterwards", () => {
    const { getByText } = render(<DeliverySettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const transfers = getByText("Concurrent transfers");
    fireEvent.blur(transfers);
    transfers.value = 50;
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the max cps field and display snackbar afterwards", () => {
    const { getByText } = render(<DeliverySettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const maxcps = getByText("Max CPS");
    fireEvent.blur(maxcps);
    maxcps.value = 0.75;
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });
});
