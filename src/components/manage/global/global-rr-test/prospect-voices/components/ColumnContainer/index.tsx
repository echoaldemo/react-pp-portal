import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Minimize, Add } from "@material-ui/icons";
import { FaRegDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ColumnContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  &:nth-child(odd) {
    background: #ffffff;
  }
`;

const ColumnData = styled.div`
  flex: 1;
`;

const NameText = styled(Typography)`
  color: #444851;
  margin: 0;
  padding: 0;
  font-weight: 500 !important;
  font-size: 14px !important;
  text-transform: capitalize;
`;

const SubText = styled(Typography)`
  color: #777777;
  margin: 0;
  padding: 0;
  margin-top: -2px !important;
  font-size: 14px !important;
`;

const Link2 = styled.a`
  color: #444851;
  text-decoration: underline;
  font-size: 14px !important;
  cursor: pointer !important;
  font-weight: 500 !important;
  margin-top: 0.6rem !important;
`;

const CustomLink = styled(Link)`
  color: #444851;
  text-decoration: underline;
  font-size: 14px !important;
  cursor: pointer !important;
  font-weight: 500 !important;
  margin-top: 0.6rem !important;
`;

const Option = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  data: any;
  voiceFn: Function;
  add: boolean;
  newRecord?: boolean;
}

export default (props: Props) => {
  function recordNewVoiceBtn() {
    return (
      <>
        <FaRegDotCircle style={{ marginRight: "7.2px", marginTop: "10px" }} />
        <CustomLink
          to={{
            pathname: "/manage/audio/prospect",
            state: props.data
          }}
        >
          {" "}
          <Typography style={{ fontSize: 14, fontWeight: 500 }}>
            Record new audio
          </Typography>
        </CustomLink>
      </>
    );
  }

  function removeVoiceBtn(voice: any) {
    return (
      <>
        <Link2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5rem"
          }}
          onClick={() => props.voiceFn(voice)}
        >
          <Minimize
            style={{
              width: "14px",
              height: "2px",
              backgroundColor: "#444851",
              marginRight: "8.5px"
            }}
          />
          <Typography style={{ fontSize: 14, fontWeight: 500 }}>
            Remove
          </Typography>
        </Link2>
      </>
    );
  }

  function addVoiceBtn(voice: any) {
    return (
      <>
        <Link2
          style={{
            marginRight: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => props.voiceFn(voice)}
        >
          <Add
            style={{
              marginRight: "4px"
            }}
          />
          <Typography style={{ fontSize: 14, fontWeight: 500 }}>
            Add voice
          </Typography>
        </Link2>
      </>
    );
  }

  return (
    <>
      <ColumnContainer>
        <ColumnData
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "20px"
          }}
        >
          <NameText>
            {`${props.data.first_name} ${props.data.last_name}` ||
              "[No voice name]"}
          </NameText>
          <SubText>{props.data.username || "[Unrecognized Recorder]"}</SubText>
        </ColumnData>

        <ColumnData
          style={{
            display: "flex",
            flex: 2,
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "flex-start",
            height: "inherit",
            marginTop: "18px",
            marginRight: "-4.5rem"
          }}
        >
          {!props.add ? (
            <>
              {props.newRecord !== undefined ? (
                <>
                  <Option>{}</Option>
                  <Option>{removeVoiceBtn(props.data)}</Option>
                </>
              ) : (
                <>
                  <Option>{recordNewVoiceBtn()}</Option>
                  <Option>{removeVoiceBtn(props.data)}</Option>
                </>
              )}
            </>
          ) : (
            <Option />
          )}
          {props.add && <Option>{addVoiceBtn(props.data)}</Option>}
        </ColumnData>
      </ColumnContainer>
    </>
  );
};
