import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TableRow,
  TableCell,
  Popover,
  Card
} from "@material-ui/core";
import { Add, Settings, Delete } from "@material-ui/icons";
import { useStyles, LightTooltip } from "./styles";
import {
  AsyncTable,
  UnderlineCell,
  DeleteModal,
  LoadingModal,
  SuccessModal,
  TableLoader,
  TableNoResult,
  SaveButton,
  Pagination
} from "common-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";
import AudioPlayer from "./player";
import styled from "styled-components";
import Create from "./Create";
import Upload from "./upload";
import { get, post, remove, patch } from "utils/api";

import { mock } from "./mock"; // eslint-disable-line
type AudioType = {
  company: any;
  params: any;
};

const Header = styled(Typography)`
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #444851 !important;
`;

const AudioResourceComponent: React.FC<AudioType> = ({ company, params }) => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);
  const [audio_resources, setAudioResources] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModify, setOpenModify] = useState(false);
  const [audioItem, setAudioItem] = useState<any>({});
  const [audioText, setAudioText] = useState("");
  const [notification, setNotification] = useState("");
  const [openLoading, setOpenLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [paginateList, setPaginateList] = useState([]);
  const [table_loading, setTableLoading] = useState(false);

  useEffect(() => {
    getAudioResources();
  }, []); // eslint-disable-line

  useEffect(() => {
    setAudioText("");
  }, [openNew]);

  const getAudioResources = () => {
    setTableLoading(true);
    get(`/pitch/company/${params.slug}/audio/resources/`).then((res: any) => {
      setAudioResources(res.data);
      setPaginateList(res.data);
      setTableLoading(false);
    });
  };

  const getClassName: Function = (i: number, { uuid, userCell }: any) => {
    switch (i) {
      case 2:
        return uuid;
      default:
        return userCell;
    }
  };

  const handleEdit: Function = (e: any, resource: any) => {
    setAnchorEl(e.currentTarget);
    setAudioItem(resource);
    setAudioText(resource.name);
    setOpenEdit(true);
  };

  const handleClose: Function = () => {
    setOpenEdit(false);
    setOpenSuccess(false);
    setOpenNew(false);
    getAudioResources();
  };

  const onDelete: Function = () => {
    setOpenDelete(false);
    setNotification("One moment. We’re removing the audio resource...");
    setOpenLoading(true);
    remove(
      `/pitch/company/${params.slug}/audio/resources/${audioItem.uuid}/`
    ).then((res: any) => {
      setOpenLoading(false);
      setNotification(`You have removed ${audioText} audio resource.`);
      setOpenSuccess(true);
    });
  };

  const onEdit: Function = () => {
    setNotification("One moment. We’re updating the audio resource...");
    setOpenLoading(true);
    patch(`/pitch/company/${params.slug}/audio/resources/${audioItem.uuid}/`, {
      name: audioText,
      company: params.uuid
    }).then((res: any) => {
      setOpenLoading(false);
      setNotification(`You have updated ${audioText} audio resource.`);
      setOpenModify(false);
      setOpenEdit(false);
      setOpenSuccess(true);
    });
  };

  const onCreate: Function = () => {
    setNotification("One moment. We’re creating the audio resource...");
    setOpenLoading(true);
    post(`/pitch/company/${params.slug}/audio/resources/`, {
      name: audioText
    }).then((res: any) => {
      setOpenLoading(false);
      setNotification(`You have created ${audioText} audio resource.`);
      setOpenSuccess(true);
    });
  };

  const handleTextChange = ({ target: { value } }: any) => {
    setAudioText(value);
  };

  const handleCancel: Function = () => {
    setOpenLoading(false);
    setOpenEdit(false);
  };

  const handleUploadFile: Function = () => {
    setOpenUpload(true);
  };

  const paginate = (from: any, to: any, page: any) => {
    setAudioResources(paginateList.slice(from, to));
  };

  const renderIcon: Function = (cellVal: any, iconProps: any) => {
    return (
      <CopyToClipboard
        text={cellVal}
        onCopy={() => setCopy(true)}
        onPointerLeave={() => setCopy(false)}
      >
        {copy ? (
          <LightTooltip title="UUID Copied!" placement="top">
            <Icon {...iconProps} />
          </LightTooltip>
        ) : (
          <LightTooltip title="Copy UUID" placement="top">
            <Icon {...iconProps} />
          </LightTooltip>
        )}
      </CopyToClipboard>
    );
  };

  const renderHeader: Function = () => (
    <Grid item xs={12} className={classes.headerStyle}>
      <div className={classes.headerContainer}>
        <Typography className={classes.headerText}>
          You can create a new audio resource for this specific company from
          this page.
        </Typography>

        <button
          onClick={() => setOpenNew(true)}
          className={classes.headerButtonStyle}
        >
          <Typography className={classes.headerButtonText}>
            <Add /> <span>New audio resource</span>
          </Typography>
        </button>
      </div>
    </Grid>
  );

  const renderRow: Function = (resource: any, passed_classes: any) => {
    let parse_resource = {
      name: resource.name,
      slug: resource.slug,
      uuid: resource.uuid,
      file: resource.file
    };
    return (
      <>
        <TableRow className={passed_classes.row}>
          {Object.values(parse_resource).map((res: any, i: number) => {
            let cellStyle = getClassName(i, passed_classes);
            const iconProps = {
              className: passed_classes.icon,
              path: mdiContentCopy,
              size: 1,
              rotate: 360
            };
            switch (i) {
              case 0: {
                return (
                  <UnderlineCell className={cellStyle}>{res}</UnderlineCell>
                );
              }
              case 2: {
                return (
                  <TableCell className={cellStyle}>
                    {" "}
                    <p style={{ color: "#777777" }}>{res}</p>
                    {renderIcon(res, iconProps)}
                  </TableCell>
                );
              }
              case 3: {
                return (
                  <TableCell className={cellStyle}>
                    <AudioPlayer
                      uploadModal={() => {
                        setAudioText(resource.name);
                        setAudioItem(resource);
                        setOpenUpload(true);
                      }}
                      data={resource}
                      name={resource.name}
                      src={resource.file ? resource.file.original_url : ""}
                    />
                  </TableCell>
                );
              }
              default:
                return <TableCell className={cellStyle}>{res}</TableCell>;
            }
          })}
          <TableCell className={passed_classes.userCell}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <Settings
                onClick={e => handleEdit(e, resource)}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  };
  const renderTable: Function = () => (
    <Grid item xs={12}>
      <AsyncTable
        headers={[
          <Header>Name</Header>,
          <Header>Slug</Header>,
          <Header>UUID</Header>,
          <Header style={{ marginLeft: 53 }}>File</Header>,
          " "
        ]}
        tableData={audio_resources}
        render={(resources: any, classes: any) =>
          resources.map((resource: any) => renderRow(resource, classes))
        }
      />
    </Grid>
  );

  const renderPopMenu: Function = () => (
    <Popover
      open={openEdit}
      anchorEl={anchorEl}
      onClose={() => setOpenEdit(false)}
    >
      <Card style={{ width: 200, height: 100 }}>
        <Grid container style={{ marginLeft: 17 }}>
          <Grid
            item
            xs={12}
            className={classes.popItem}
            onClick={() => setOpenModify(true)}
          >
            <Settings style={{ marginRight: 17, color: "#777777" }} />{" "}
            <Typography style={{ color: "#777777", fontWeight: 600 }}>
              Modify
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.popItem}
            onClick={() => setOpenDelete(true)}
          >
            <Delete style={{ marginRight: 17, color: "#777777" }} />{" "}
            <Typography style={{ color: "#777777", fontWeight: 600 }}>
              Delete
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Popover>
  );

  const renderCreate: Function = () => (
    <Create
      open={openNew}
      title="New audio resource"
      value={audioText}
      handleClick={onCreate}
      handleChange={handleTextChange}
      onClose={() => setOpenNew(false)}
    />
  );

  const renderEdit: Function = () => (
    <Create
      open={!openDelete && !openLoading && !openSuccess && openModify}
      title="Edit audio resource"
      value={audioText}
      handleClick={onEdit}
      handleChange={handleTextChange}
      mode="edit"
      onClose={() => {
        setOpenEdit(false);
        setOpenModify(false);
      }}
    />
  );

  const renderDeleteModal: Function = () => (
    <>
      <DeleteModal
        open={openDelete}
        header="Delete audio resource"
        msg="audio resource"
        name={audioText}
        closeFn={() => {
          setOpenEdit(false);
          setOpenDelete(false);
        }}
        delFn={() => onDelete()}
      />
    </>
  );

  const renderLoading: Function = () => (
    <LoadingModal
      open={openLoading}
      text={notification}
      cancelFn={() => handleCancel()}
    />
  );

  const renderSuccess: Function = () => {
    let dynamicProp = {};

    if (openNew)
      dynamicProp = {
        btnText: "UPLOAD FILE",
        btnFn: () => handleUploadFile()
      };

    return (
      <SuccessModal
        open={openSuccess}
        text={notification}
        closeFn={() => handleClose()}
        {...dynamicProp}
      />
    );
  };

  const renderUpload: Function = () => (
    <Upload
      company={params}
      audioItem={audioItem}
      getAudioResources={getAudioResources}
      open={openUpload}
      title={audioText}
      cancelUpload={() => handleCancel()}
      onClose={() => {
        setOpenUpload(false);
      }}
    />
  );

  const renderPagination: Function = () => (
    <Pagination
      paginateFn={paginate}
      totalItems={paginateList.length}
      itemsPerPage={5}
    />
  );

  if (table_loading) return <TableLoader />;
  else if (audio_resources.length <= 0)
    return (
      <>
        {renderCreate()}
        <TableNoResult
          headerText="Audio resources"
          mainMessage="No audio resource have been created"
          subMessage="Would you like to create one? Just hit the “New resource” button."
          renderButton={
            <SaveButton onClick={() => setOpenNew(true)}>
              <Add />
              New resource
            </SaveButton>
          }
        />
        {renderSuccess()}
        {renderLoading()}
      </>
    );
  else
    return (
      <Grid container>
        {renderCreate()}
        {renderDeleteModal()}
        {renderEdit()}
        {renderLoading()}
        {renderHeader()}
        {renderTable()}
        {renderPagination()}
        {renderPopMenu()}
        {renderSuccess()}
        {renderUpload()}
      </Grid>
    );
};

export default AudioResourceComponent;
