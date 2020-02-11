import React, { useContext } from "react";
import { SaveButton } from "common-components";
import { InputField } from "../../utils/const-var";
import { store } from "contexts/EditOptionGroupContext";
import { post } from "utils/api"; // eslint-disable-line
import { uuidv4 } from "../../utils/const-var";

const AddOption = () => {
  const { state, dispatch } = useContext(store);

  const handleAdd = () => {
    dispatch({
      type: "EDIT",
      payload: { edit: { ...state.edit, load: true } }
    });
    // post(`/pitch/global/gui/field-option-group/${state.edit.uuid}/options/`, {
    // 	description: state.edit.description,
    // 	value: state.edit.value
    // })
    // 	.then((res: any) => {
    // 		dispatch({
    // 			type: 'EDIT', payload: {
    // 				edit: { ...state.edit, load: false, done: true, open: false, name: state.edit.description }
    // 			}
    // 		})
    // 		dispatch({
    // 			type: 'GROUP', payload: {
    // 				group: { ...state.group, options: [...state.group.options, res.data] }
    // 			}
    // 		})
    // 	})
    // 	.catch((err: any) => {
    // 		try {
    // 			if (err.response.data) {
    // 				dispatch({ type: 'EDIT', payload: { edit: { ...state.edit, snackErr: err.response.data.value[0] } } })
    // 			}
    // 		} catch {
    // 			console.log(err)
    // 		}
    // 	})
    //mock
    setTimeout(() => {
      dispatch({
        type: "EDIT",
        payload: {
          edit: {
            ...state.edit,
            load: false,
            done: true,
            open: false,
            name: state.edit.description
          }
        }
      });
      dispatch({
        type: "GROUP",
        payload: {
          group: {
            ...state.group,
            options: [
              ...state.group.options,
              {
                uuid: uuidv4(),
                description: state.edit.description,
                value: state.edit.value
              }
            ]
          }
        }
      });
    }, 1000);
  };

  const handleChange = (e: any) => {
    if (e.target.value) {
      dispatch({
        type: "EDIT",
        payload: {
          edit: {
            ...state.edit,
            [e.target.id]: e.target.value,
            error: { ...state.edit.error, [e.target.id]: "" }
          }
        }
      });
    } else {
      dispatch({
        type: "EDIT",
        payload: {
          edit: {
            ...state.edit,
            [e.target.id]: e.target.value,
            error: {
              ...state.edit.error,
              [e.target.id]: `${[e.target.id]} is required`
            }
          }
        }
      });
    }
  };

  return (
    <div className="add-edit-cont">
      <InputField
        value={state.edit.description}
        onChange={handleChange}
        onBlur={handleChange}
        id="description"
        fullWidth
        label="Field description"
        required
        error={state.edit.error.description ? true : false}
        helperText={
          state.edit.error.description ? state.edit.error.description : " "
        }
      />
      <InputField
        value={state.edit.value}
        onChange={handleChange}
        onBlur={handleChange}
        id="value"
        fullWidth
        label="Field value"
        required
        error={state.edit.error.value ? true : false}
        helperText={state.edit.error.value ? state.edit.error.value : " "}
      />
      <SaveButton
        onClick={handleAdd}
        disabled={
          state.edit.error.description ||
          state.edit.error.value ||
          !state.edit.description ||
          !state.edit.value
            ? true
            : false
        }
      >
        save option
      </SaveButton>
    </div>
  );
};

export default AddOption;
