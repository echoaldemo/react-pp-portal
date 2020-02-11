import React, { useContext } from "react";
import { PanelTabs, Panel, EditText } from "common-components";
import { Collapse } from "@material-ui/core";
import { EditPanelForm } from "./Forms";
import { Add } from "@material-ui/icons";
import FieldsTable from "./FieldsTable";
import { IdentityContext } from "contexts/IdentityProvider";
const PanelFieldTabs = () => {
  const { state, dispatch } = useContext(IdentityContext);

  return (
    <div>
      {console.log(state, "State")}
      <PanelTabs
        labels={state.panels.map((label: any) => {
          return label.name;
        })}
        tab={state.panel_tab}
        setTab={(e: any) => {
          dispatch({ type: "SET_PANEL_TAB", payload: { panel_tab: e } });
        }}
      />
      <PanelContents />
    </div>
  );
};

const PanelContents = () => {
  const { state } = useContext(IdentityContext);

  return state.panels.map((item: any, i: number) => {
    return (
      <Panel value={state.panel_tab} index={i} key={i}>
        <div className="panel-container">
          <PanelHeader item={item} />
          <div className="panel-table-container">
            <FieldsTable data={item.options} />
          </div>
        </div>
      </Panel>
    );
  });
};

const PanelFieldsHeader = ({ item }: any) => {
  const { editPanel, setEditPanel } = useContext(IdentityContext);

  return (
    <div className="panel-header">
      <div>
        <span className="panel-title">{item.name}</span>
      </div>
      <div>
        <EditText
          text={item.name}
          onClick={() => {
            setEditPanel(!editPanel);
          }}
          open={editPanel}
        />
      </div>
    </div>
  );
};

const renderAddButton = (data: any) => {
  return data ? (
    <React.Fragment>
      <Add style={{ fontSize: 16, marginRight: 5 }} />
      <span>Add new option</span>
    </React.Fragment>
  ) : null;
};

const FieldsHeader = ({ item }: any) => {
  return (
    <div className="panel-header">
      <div>
        <span className="panel-title-2">Fields</span>
      </div>
      <div>
        <span
          className="panel-edit-text-2"
          onClick={() => {
            // setOpenModal(true);
            return null;
          }}
        >
          {renderAddButton(item.fields)}
        </span>
      </div>
    </div>
  );
};
const EditPanel = () => {
  const { editPanel } = useContext(IdentityContext);
  return (
    <Collapse in={editPanel}>
      <EditPanelForm />
    </Collapse>
  );
};
const PanelHeader = (props: any) => {
  return (
    <React.Fragment>
      <PanelFieldsHeader {...props} />
      <EditPanel />
      <FieldsHeader {...props} />
    </React.Fragment>
  );
};

export default PanelFieldTabs;
