import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PhoneNumberSettings from "./PhoneNumberSettings";
import LoaderDialog from "../common-components/LoaderDialog";
import SnackBar from "../common-components/SnackBar";

afterEach(cleanup);

describe("<PhoneNumberSettings />", () => {
  it("Displays the fields", () => {
    const { getByText } = render(<PhoneNumberSettings />);
    const tf = getByText("Number list");
    const cb = getByText("Enable local match");
    expect(tf).toBeInTheDocument();
    expect(cb).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the number list field and display snackbar afterwards", () => {
    const { getByText } = render(<PhoneNumberSettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const numlist = getByText("Number list");
    fireEvent.change(numlist);
    numlist.value = "id";
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });

  it("Display the loader dialog after performing any change in the Enable local match field and display snackbar afterwards", () => {
    const { getByText } = render(<PhoneNumberSettings />);
    const { getByTestId, unmount } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<SnackBar open={true} />);
    const dialog = getByTestId("loader-dialog");
    const snackbar = getByTestId("snackbar");
    const localmatch = getByText("Enable local match");
    fireEvent.change(localmatch);
    localmatch.value = !localmatch.value;
    expect(dialog).toBeInTheDocument();
    unmount();
    expect(dialog).not.toBeInTheDocument();
    expect(snackbar).toBeInTheDocument();
  });
});
