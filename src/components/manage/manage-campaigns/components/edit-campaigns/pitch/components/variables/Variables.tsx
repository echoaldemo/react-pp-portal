import React from "react";
import { TableNoResult, SaveButton, AlertModal, AsyncTable } from "common-components";
import { Add } from "@material-ui/icons";
import {
  Button,
  TableCell,
  TableRow,
} from "@material-ui/core/";

export default function Variables() {
  const [openAddVarModal, setOpenAddVarModal] = React.useState(true);

  // const handleDisplayModal = () => setOpen(!open);

  const renderAddVarModal = () => (
    <AlertModal open={openAddVarModal} severity={'info'} message={'Informative text for example…'} handlerClickBtn={() => setOpenAddVarModal(!openAddVarModal)} />
  )

  const renderTableNoResult = () => (
    <TableNoResult
      headerText="Pitch Variables"
      mainMessage="No pitch variables have been created"
      subMessage="Would you like to creat one? Just hit the “New Variable” button."
      renderButton={
        <SaveButton
          onClick={() => setOpenAddVarModal(!openAddVarModal)}
        >
          <Add />
          New Variable
        </SaveButton>
      }
    />
  )

  const sampleData = [
    {
      name: "test",
      slug: "test",
      uuid: "3d83a30c-0431-11ea-b33e-0242ac110011",
      live: true,
      active: true
    },
    {
      name: "test",
      slug: "test",
      uuid: "3d83a30c-0431-11ea-b33e-0242ac110014",
      live: false,
      active: false
    }
  ];

  const renderVariablesList = () => (
    <AsyncTable headers={["Name", "Slug", "UUID"]} tableData={sampleData} render={(samples: any, {
      row,
      cell,
      uuid,
      icon
    }: any) => samples.map((sample: {
      uuid: string,
      name: string,
      slug: string,
    }) => <TableRow className={row} key={sample.uuid}>
        <TableCell className={cell}>{sample.name}</TableCell>
        <TableCell className={cell}>{sample.slug}</TableCell>
        <TableCell className={uuid}>
          <p>{sample.uuid}</p>
          {/* <CopyToClipboard text={sample.uuid} onCopy={() => setCopy(true)} onPointerLeave={() => setCopy(false)}>
          {copy ? <LightTooltip title="UUID Copied!" placement="top">
            <Icon className={icon} path={mdiContentCopy} size={1} rotate={360} />
          </LightTooltip> : <LightTooltip title="Copy UUID" placement="top">
              <Icon className={icon} path={mdiContentCopy} size={1} rotate={360} />
            </LightTooltip>}
        </CopyToClipboard> */}
        </TableCell>
      </TableRow>)} />
  );

  return (
    <div className="c-default">
      {true ? renderVariablesList() : renderTableNoResult()}

    </div>
  );
}

// export default variables;