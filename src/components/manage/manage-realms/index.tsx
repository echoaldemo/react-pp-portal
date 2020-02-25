import React, { useState, useEffect } from "react";
import {
  HeaderButton,
  HeaderLink,
  SearchBar,
  TableLoader,
  FilterToolBar,
  Pagination,
  InputField,
  Modal,
  LoadingModal,
  SuccessModal,
  TableNoResult
} from "common-components";
import { Divider, Paper, InputAdornment } from "@material-ui/core";
import {
  Container,
  menus,
  BtnCont,
  Switch,
  SaveButton,
  CancelBtn,
  constCreate,
  MockRealm
} from "./components/contsVar";
import { Add } from "@material-ui/icons";
import ReamlTable from "./components/RealmTable";
import SEO from "utils/seo";
import { get, post } from "utils/api";
import slugify from "slugify";

interface RealmProps {
  history: any;
}

const Realms: React.FC<RealmProps> = ({ history }) => {
  const [realms, setRealms] = useState([]);
  const [paginateList, setPaginateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [create, setCreate] = useState(constCreate);

  useEffect(() => {
    getData();
  }, []);

  // const cancel = () => {
  //   // api cancel
  //   console.log("cancel api");
  // };
  const getData = () => {
    get("/identity/realm/list/", { order_by: "-datetime_modified" })
      .then((res: any) => {
        setRealms(res.data);
        setPaginateList(res.data);
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  };

  const paginate = (from: number, to: number) => {
    setRealms(paginateList.slice(from, to));
  };

  const FilterApplyButton = (params: any) => {
    setLoading(true);
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { is_active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/realm/list/", parameter).then((res: any) => {
      setRealms(res.data);
      setPaginateList(res.data);
      setLoading(false);
    });
  };

  const handleClose = () => {
    setCreate(constCreate);
  };

  const handleChange = (e: any) => {
    if (e.target.value) {
      setCreate({ ...create, name: e.target.value, nameErr: "" });
    } else {
      setCreate({
        ...create,
        name: e.target.value,
        nameErr: "A realm name is required"
      });
    }
  };
  const handleCreate = () => {
    setCreate({ ...create, load: true });
    post("/identity/realm/create/", {
      name: create.name,
      active: create.active,
      slug: slugify(create.name)
    })
      .then(() => {
        setCreate({ ...create, load: false, done: true });
      })
      .catch((err: any) => {
        try {
          if (err.response.data) {
            setCreate({
              ...create,
              load: false,
              nameErr: "realm with this name/slug already exists."
            });
          }
        } catch {
          console.log(err);
        }
      });
  };

  return (
    <>
      <SEO title="Manage Realms" />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 30
        }}
      >
        <HeaderLink menu={menus} title="Realms" />
        {realms.length !== 0 && (
          <HeaderButton
            openFunction={() => setCreate({ ...create, open: true })}
            buttonText="New realm"
          />
        )}
      </div>
      <Paper>
        {!loading && realms.length === 0 ? (
          <TableNoResult
            headerText="Realms"
            mainMessage="No realm have been created"
            subMessage="Would you like to creat one? Just hit the “New Realm” button."
            renderButton={
              <SaveButton onClick={() => setCreate({ ...create, open: true })}>
                <Add />
                New Realm
              </SaveButton>
            }
          />
        ) : (
          <Container>
            <div style={{ width: "100%" }}>
              <SearchBar
                title="realm"
                userData={realms}
                headers={["name", "uuid"]}
                active={true}
                link={true}
                loading={loading}
                pathnameData={{
                  firstLink: `/manage/realms/edit/`,
                  fetchData: ["uuid"],
                  lastLink: ``
                }}
              />
              <Divider />
              <FilterToolBar
                FilterApplyButton={FilterApplyButton}
                sortBy={true}
                activeStatus={true}
              />
              {loading ? (
                <TableLoader />
              ) : (
                <>
                  <ReamlTable realms={realms} history={history} />
                  {Boolean(paginateList.length) && (
                    <Pagination
                      paginateFn={paginate}
                      totalItems={paginateList.length}
                      itemsPerPage={6}
                    />
                  )}
                </>
              )}
            </div>
          </Container>
        )}
      </Paper>

      <LoadingModal
        open={create.load}
        text={"One moment. We’re adding the realm…"}
        cancelFn={() => {
          // cancel()
          setCreate({ ...create, load: false });
        }}
      />
      <SuccessModal
        open={create.done}
        text={`You have created the “${create.name}” Realm`}
        btnText={"CREATE ANOTHER"}
        closeFn={getData}
        btnFn={() => {
          const { open, ...rest } = constCreate;
          setCreate({ ...rest, open: true });
        }}
      />
      <Modal open={create.open} title="Create new realm" onClose={handleClose}>
        <InputField
          label="Realm name"
          required
          fullWidth
          value={create.name}
          onChange={handleChange}
          onBlur={handleChange}
          error={create.nameErr ? true : false}
          helperText={create.nameErr ? create.nameErr : " "}
        />
        <InputField
          label="Active"
          disabled
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  color="primary"
                  checked={create.active}
                  onChange={() =>
                    setCreate({ ...create, active: !create.active })
                  }
                />
              </InputAdornment>
            )
          }}
        />
        <BtnCont>
          <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
          <SaveButton
            disabled={!create.name || create.nameErr}
            onClick={handleCreate}
          >
            Create
          </SaveButton>
        </BtnCont>
      </Modal>
    </>
  );
};

export { Realms };
