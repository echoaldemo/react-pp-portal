import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Error, PlaylistAddCheck } from "@material-ui/icons";
import { MdFileDownload } from "react-icons/md";
import { ButtonWithIcon } from "common-components";
// import { ButtonWithIcon } from "../../../../../../../../../../../test/portal-migration/src/components/common-components/buttons";
import FileSaver from "file-saver";
const ValidateButton = styled.button`
  width: 160px;
  height: 40px;
  border: none;
  border-radius: 3px;
  background-color: #7c8a97;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 45px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 1;
  }
`;

const HeaderContainer = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const VText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const LeftContainer = styled.div``;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default (props: any) => {
  function downloadArr() {
    // let mock = [
    //   {
    //     number: "+12345678",
    //     pool: "pool-1",
    //     expected: false,
    //     actual: "nam-c",
    //     complaints: 0
    //   }
    // ];

    let parseData = [
      ["Number", "Pool", "Expected CNam", "Actual CNam", "# Complaints"]
    ];

    let tblData = props.data.map((key: any) => {
      return {
        number: key.number,
        pool: key.did_pool_name,
        expected_cname: key.cname_valid,
        actual_cname: key.cname_string,
        complaints: key.complaints
      };
    });

    tblData.forEach((key: any) => {
      let keyData: any = Object.values(key).map(val => {
        return val;
      });

      parseData.push(keyData);
    });
    const csvData = new Blob([parseData.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    FileSaver.saveAs(csvData, "validation-results.csv");
  }
  return (
    <HeaderContainer>
      <LeftContainer>
        <Text>
          <strong>ID's validation</strong>
        </Text>

        <div
          style={{
            marginTop: "11px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Image>
            <Error
              style={{ color: "#ff504d", fontSize: "22px", marginRight: "9px" }}
            />
          </Image>
          <Typography
            style={{
              fontSize: "16px",
              color: "#777777"
            }}
          >
            {props.loading
              ? "Loading data ..."
              : `Showing ${props.invalidCount}`}
          </Typography>
        </div>
      </LeftContainer>

      <RightContainer>
        <ButtonWithIcon
          handleClick={() => (props.canDownload ? downloadArr() : null)}
          icon={<MdFileDownload />}
        >
          Download .cvs
        </ButtonWithIcon>
        <ValidateButton
          style={props.loading ? { opacity: "0.5" } : {}}
          disabled={props.loading}
          onClick={() => props.validate()}
        >
          <PlaylistAddCheck style={{ color: "#ffffff", marginRight: "7px" }} />
          <VText>Validate again</VText>
        </ValidateButton>
      </RightContainer>
    </HeaderContainer>
  );
};
