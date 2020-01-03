import React from "react";
import { Grid } from "@material-ui/core";
import { DTag } from "../styles";

type Props = {
  description: any;
};

const DescribeRole = ({ description }: Props) => {
  function renderDefinitions(describe: any, i: number) {
    return (
      <div key={i}>
        <DTag>{describe.length > 0 && "Description"}</DTag>
        <ul>
          {describe.map((key: any, i: number) => (
            <li key={i}>{key}</li>
          ))}
        </ul>
      </div>
    );
  }

  function renderPermissions(describe: any, i: number) {
    console.log("Permission", describe);
    const permitStyle = {
      listStyle: "none",
      marginTop: 14
    };

    return (
      <div key={i}>
        <DTag>{describe.length > 0 && "Permission"}</DTag>
        {describe.map((permit: any, i: number) => {
          return (
            <React.Fragment key={i}>
              <li style={permitStyle}>{permit.title}</li>

              <ul>
                {permit.data.map((data: any, i: number) => (
                  <li key={i}>{data}</li>
                ))}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={1}>
        {description.map((describe: any, i: number) => {
          let tag = "Description";
          if (i === 0) return renderDefinitions(describe, i);
          else return renderPermissions(describe, i);
        })}
      </Grid>
    </>
  );
};

DescribeRole.defaultProps = {
  description: []
};

export { DescribeRole };
