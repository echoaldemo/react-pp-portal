import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AIsettings from "./AIsettings";
import Textfield from "../common-components/Textfield";
import LoaderDialog from "../common-components/LoaderDialog";
import SnackBar from "../common-components/SnackBar";

// Test 1:
//  Test to make sure this component display all the fields

// Test 2:
//  Test to make sure this component display all the AI Rules menu items

// Test 3:
//  Test to make sure the loader dialog opens up when performing action on fields

// Test 4:
//  Test to make sure this component renders the toast bar after performing an action on fields

afterEach(cleanup);

describe("<AIsettings />", () => {
  test("displays all fields", () => {
    const { getByLabelText } = render(<AIsettings />);
    const aiRules = getByLabelText(/AI Rules/i);
    const voiceSched = getByLabelText(/Enable voice scheduling/i);
    const amd = getByLabelText(/Enable enhanced AMD/i);
    expect(aiRules).toBeInTheDocument();
    expect(voiceSched).toBeInTheDocument();
    expect(amd).toBeInTheDocument();
  });

  test("renders the toast bar after performing a success action on fields and snackbar value is 'true' ", () => {
    const { getByLabelText } = render(<AIsettings />);
    const { getByTestId } = render(<SnackBar open={true} />);
    const aiRules = getByLabelText(/AI Rules/i);
    aiRules.value = "new";
    fireEvent.change(aiRules);
    expect(getByTestId("snackbar")).toBeInTheDocument();
    const voiceSched = getByLabelText(/Enable voice scheduling/i);
    voiceSched.value = !voiceSched.value;
    fireEvent.change(voiceSched);
    expect(getByTestId("snackbar")).toBeInTheDocument();
    const amd = getByLabelText(/Enable enhanced AMD/i);
    amd.value = !amd.value;
    fireEvent.change(amd);
    expect(getByTestId("snackbar")).toBeInTheDocument();
  });

  test("opens up the loader dialog when field value changed and dialog value is 'true' ", () => {
    const { getByTestId } = render(<LoaderDialog open={true} />);
    const { getByLabelText } = render(<AIsettings />);
    const aiRules = getByLabelText(/AI Rules/i);
    aiRules.value = "new";
    fireEvent.change(aiRules);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();
    const voiceSched = getByLabelText(/Enable voice scheduling/i);
    voiceSched.value = !voiceSched.value;
    fireEvent.change(voiceSched);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();
    const amd = getByLabelText(/Enable enhanced AMD/i);
    amd.value = !amd.value;
    fireEvent.change(amd);
    expect(getByTestId("loader-dialog")).toBeInTheDocument();
  });

  // test("display AI Rules menu items", () => {
  //   const fakeItemsList = [
  //     { id: 1, name: "item1" },
  //     { id: 2, name: "item2" },
  //     { id: 3, name: "item3" }
  //   ];

  //   const { getAllByTestId, getByTestId } = render(
  //     <Textfield values={fakeItemsList} input={fakeItemsList[0].name} />
  //   );
  //   const aiRules = getByTestId("textfield");
  //   fireEvent.click(aiRules);
  //   const menuItems = getAllByTestId("ai").map(
  //     menuItem => menuItem.textContent
  //   );
  //   const fakeItems = fakeItemsList.map(list => list.name);
  //   expect(menuItems).toEqual(fakeItems);
  // });
});
