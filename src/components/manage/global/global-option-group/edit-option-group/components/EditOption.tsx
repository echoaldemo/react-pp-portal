import React, { useEffect, useContext } from "react";
import { InputField } from "../../utils/const-var";
import { SaveButton } from "common-components";
import { store } from "contexts/EditOptionGroupContext";
import { patch } from "utils/api"; // eslint-disable-line

const EditOption = () => {
  const { state, dispatch } = useContext(store); // eslint-disable-line

  useEffect(() => {
    dispatch({
      type: "EDIT",
      payload: { edit: { ...state.edit, editData: state.current } }
    });
  }, []); // eslint-disable-line

  const handleEdit = () => {
    if (state.current.value === state.edit.editData.value) {
      delete state.edit.editData.value;
    }
    dispatch({
      type: "EDIT",
      payload: {
        edit: { ...state.edit, load: true, edit: false }
      }
    });
    // patch(
    // 	`/pitch/global/gui/field-option-group/${state.group.uuid}/options/${state.edit.editData.uuid}/`,
    // 	{
    // 		...state.edit.editData
    // 	}
    // )
    // 	.then((res: any) => {
    // 		dispatch({
    // 			type: 'GROUP', payload: {
    // 				group: {
    // 					...state.group,
    // 					options: state.group.options.map((op: any) =>
    // 						op.uuid === state.edit.editData.uuid ? res.data : op
    // 					)
    // 				}
    // 			}
    // 		})
    // 		dispatch({
    // 			type: 'EDIT', payload: {
    // 				edit: { ...state.edit, load: false, edit: false }
    // 			}
    // 		})
    // 	})
    // 	.catch((err: any) => {
    // 		try {
    // 			if (err.response.data) {
    // 				dispatch({
    // 					type: 'EDIT', payload: {
    // 						edit: { ...state.edit, snackErr: err.response.data.value[0] }
    // 					}
    // 				})
    // 			}
    // 		} catch {
    // 			console.log(err);
    // 		}
    // 	});
    //mock
    setTimeout(() => {
      dispatch({
        type: "GROUP",
        payload: {
          group: {
            ...state.group,
            options: state.group.options.map((op: any) => {
              if (op.uuid === state.edit.editData.uuid) {
                return { ...op, ...state.edit.editData };
              } else {
                return op;
              }
            })
          }
        }
      });
      dispatch({
        type: "EDIT",
        payload: {
          edit: { ...state.edit, load: false, edit: false }
        }
      });
    }, 1000);
    console.log(state.edit.editData);
  };

  const handleChange = (e: any) => {
    if (e.target.value) {
      dispatch({
        type: "EDIT",
        payload: {
          edit: {
            ...state.edit,
            editData: { ...state.edit.editData, [e.target.id]: e.target.value },
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
            editData: { ...state.edit.editData, [e.target.id]: e.target.value },
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
        value={
          state.edit.editData.description ? state.edit.editData.description : ""
        }
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
        value={state.edit.editData.value ? state.edit.editData.value : ""}
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
        onClick={handleEdit}
        disabled={
          state.edit.error.description || state.edit.error.value ? true : false
        }
      >
        save option
      </SaveButton>
    </div>
  );
};

export default EditOption;
