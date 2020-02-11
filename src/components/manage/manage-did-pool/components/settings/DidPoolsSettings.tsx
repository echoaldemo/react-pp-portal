import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { get } from "utils/api";
import { Paper, Dialog } from "@material-ui/core";
import DidPoolsUpdate from "./DidPoolsUpdate";
import { menus } from "../../utils/const-var";
import Create from "./components/CreateDid";
import Validation from "./components/validate-did/ValidateDid";
import {
  ShoppingCartOutlined as Shopping,
  PlaylistAddCheckOutlined as Playlist,
  Add
} from "@material-ui/icons";

/*COMPONENTS*/
import {
  TableLoader,
  LoadingModal,
  SuccessModal,
  SaveButton,
  HeaderLink
} from "common-components";
import DidTable from "./components/DidTable";
import styles from "./DidPoolsSettings.styles";
import BuyDid from "./buy-did-number/BuyDid";
import DidPurchase from "./did-purchase/DidPurchase";
import Successful from "./did-purchase/successful";

const dids = [
  {
    number: "(406) 262-8717",
    purchased: true
  },
  {
    number: "(406) 262-8718",
    purchased: true
  },
  {
    number: "(406) 262-8719",
    purchased: true
  },
  {
    number: "(406) 262-8720",
    purchased: false
  },
  {
    number: "(406) 262-8721",
    purchased: true
  },
  {
    number: "(406) 262-8722",
    purchased: true
  },
  {
    number: "(406) 262-8723",
    purchased: false
  },
  {
    number: "(406) 262-8724",
    purchased: false
  }
];

interface Props {
  match: any;
  history: any;
}

interface State {
  modalA: boolean;
  modalB: boolean;
  modalC: boolean;
  loadingDid: boolean;
  didData: any;
  company: any;
  campaign: any;
  companySlug: string;
  campaignSlug: string;
  poolId: string;
  openNew: boolean;
  openValidate: boolean;
  openBuy: boolean;
  loading: boolean;
  showResults: boolean;
  successOder: boolean;
  successError: boolean;
  openEdit: boolean;
  editData: any;
  didList: any;
}

const initialBuy = {
  loading: false,
  showResults: false,
  successOder: false,
  successError: false
};

class DidPoolsSettings extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalA: false,
      modalB: false,
      modalC: false,
      loadingDid: true,
      didData: [],
      company: [],
      campaign: [],
      companySlug: "",
      campaignSlug: "",
      poolId: "",
      openNew: false,
      openValidate: false,
      openBuy: false,
      loading: false,
      showResults: false,
      successOder: false,
      successError: false,
      openEdit: false,
      editData: null,
      didList: []
    };
  }
  async componentDidMount() {
    this.fetchDID();
    this.setState({
      poolId: this.props.match.params.uuid
    });
  }

  handleOpenEdit = (data: any) => {
    this.setState({
      openEdit: true,
      editData: data
    });
  };

  fetchDID = () => {
    this.setState({ loadingDid: false });
    get(
      `/did/company/all/campaign/all/pool/${this.props.match.params.uuid}/`
    ).then((res: any) => {
      this.setState({
        didData: res.data,
        loadingDid: false
      });
      Promise.all([
        get(`/identity/company/${res.data.company}`),
        get(`/identity/campaign/${res.data.campaign}`)
      ]).then(data => {
        if (data.length > 1) {
          this.setState({
            companySlug: data[0].data.slug,
            campaignSlug: data[1].data.slug
          });
          this.fetchDIDlist(
            data[0].data.slug,
            data[1].data.slug,
            this.props.match.params.uuid
          );
        }
      });
    });
  };

  renderCreate = () => {
    return (
      <Create
        poolId={this.state.poolId}
        companySlug={this.state.companySlug}
        campaignSlug={this.state.campaignSlug}
        open={this.state.openNew}
        onClose={() => this.setState({ openNew: false })}
      />
    );
  };

  renderValidate = () => {
    return (
      <>
        <Validation
          poolId={this.state.poolId}
          companySlug={this.state.companySlug}
          campaignSlug={this.state.campaignSlug}
          open={this.state.openValidate}
          onClose={() => this.setState({ openValidate: false })}
        />
      </>
    );
  };
  toggleBuy = () => {
    this.setState({
      openBuy: !this.state.openBuy
    });
    setTimeout(() => {
      this.setState(initialBuy);
    }, 500);
  };

  buyAgain = () => {
    this.setState(initialBuy);
  };

  placeOrder = (length: number) => {
    if (length === 1) {
      this.setState({
        loading: true,
        showResults: false
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          successOder: true
        });
      }, 500);
    } else {
      this.setState({
        loading: true,
        showResults: false
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          successError: true
        });
      }, 500);
    }
  };

  fetchDIDlist = (company: string, campaign: string, uuid: string) => {
    get(`/did/company/${company}/campaign/${campaign}/pool/${uuid}/did/`).then(
      (result: any) => {
        this.setState({
          didList: result.data
        });
      }
    );
  };

  fetchDIDlistNoParams = () => {
    get(
      `/did/company/${this.state.companySlug}/campaign/${this.state.campaignSlug}/pool/${this.props.match.params.uuid}/did/`
    ).then((result: any) => {
      this.setState({
        didList: result.data
      });
    });
  };

  render() {
    return (
      <>
        {this.renderCreate()}
        {this.renderValidate()}
        <div style={{ marginBottom: "50px" }}>
          <DidPoolsUpdate
            uuid={this.props.match.params.uuid}
            history={this.props.history}
          />
        </div>
        <div className="header-container">
          <HeaderLink menu={menus} title="DID's" />
          <div style={{ display: "flex" }}>
            <SaveButton
              style={{
                marginRight: 24,
                backgroundColor: "transparent",
                width: "200px"
              }}
              onClick={() => {
                this.setState({
                  openNew: true
                });
              }}
            >
              <div
                style={{
                  color: "#1194f6",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Add /> Add existing DID
              </div>
            </SaveButton>
            <SaveButton
              style={{
                marginRight: 24,
                backgroundColor: "#7c8a97",
                width: "160px"
              }}
              onClick={() => {
                this.setState({
                  openValidate: true
                });
              }}
            >
              <Playlist style={{ width: "25px", height: "20px" }} />
              Validate ID's
            </SaveButton>
            <SaveButton
              style={{ width: "160px" }}
              onClick={() => {
                this.setState({ openBuy: true });
              }}
            >
              <Shopping
                style={{ width: "20px", height: "20px", marginRight: "2px" }}
              />{" "}
              Buy DID
            </SaveButton>
          </div>
        </div>
        <Paper style={{ height: "auto" }}>
          {this.state.loadingDid ? (
            <TableLoader />
          ) : (
            <>
              <DidTable
                openEdit={this.state.openEdit}
                handleOpenEdit={this.handleOpenEdit}
                handleCloseEdit={() => this.setState({ openEdit: false })}
                editData={this.state.editData}
                history={this.props.history}
                didList={this.state.didList}
                fetchDIDList={this.fetchDIDlistNoParams}
                campaignSlug={this.state.campaignSlug}
                companySlug={this.state.companySlug}
              />
            </>
          )}
        </Paper>

        {this.state.loading ? (
          <LoadingModal
            open={this.state.openBuy}
            text={`One moment. We're loading the results...`}
            cancelFn={this.toggleBuy}
          />
        ) : this.state.successOder ? (
          <SuccessModal
            open={this.state.openBuy}
            text={"Your order has been placed succesfully"}
            qty={200}
            subtitle={
              "We are processing your order. This could take up to one hour. You will receive a confirmation email when the process is done."
            }
            btnText={"BUY ANOTHER"}
            closeFn={this.toggleBuy}
            btnFn={this.buyAgain}
          />
        ) : this.state.successError ? (
          <Successful
            open={this.state.openBuy}
            text={"Your order has been placed succesfully"}
            dids={dids}
            subtitle={
              "Some dids were not bought because they are already taken."
            }
            btnText={"BUY ANOTHER"}
            closeFn={this.toggleBuy}
            btnFn={this.buyAgain}
          />
        ) : this.state.showResults ? (
          <DidPurchase
            header="Buy DID number"
            closeFn={this.toggleBuy}
            placeOrder={this.placeOrder}
          />
        ) : (
          <Dialog
            open={this.state.openBuy}
            maxWidth={this.state.showResults ? "lg" : false}
            fullWidth={this.state.showResults ? true : false}
          >
            <BuyDid
              header="Buy DID number"
              closeFn={this.toggleBuy}
              searchFn={() => {
                this.setState({
                  loading: true
                });
                setTimeout(() => {
                  this.setState({ showResults: true, loading: false });
                }, 1000);
              }}
            />
          </Dialog>
        )}
      </>
    );
  }
}

export default withStyles(styles)(DidPoolsSettings);
