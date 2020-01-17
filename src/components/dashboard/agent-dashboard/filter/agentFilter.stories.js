import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import AgentFilter from ".";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import DatePicker from "./datePicker";

const FilterContainer = styled.div`
  width: 72vw;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 3px 0px 9px 24px;
`;

const FilterActual = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ApplyText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const ApplyButton = styled.button`
  outline: none;
  border: none;
  margin-right: 25px;
  cursor: pointer;
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;

  &:hover {
    opacity: 0.8;
  }

  &: active {
    opacity: 1;
  }
`;

const stories = storiesOf("Agent Filter", module);

stories.add("default", () =>
  createElement(() => {
    const [selectedDate, setSelectedDate] = React.useState(
      new Date("2019-11-15T21:11:54")
    );

    const handleDateChange = date => {
      setSelectedDate(date);
    };
    return (
      <FilterContainer>
        <FilterActual>
          {[
            {
              tag: "Campaign",
              data: [
                {
                  name: "All"
                },
                {
                  name: "Campaign 1"
                },
                {
                  name: "Campaign 2"
                },
                {
                  name: "Campaign 3"
                }
              ]
            },
            {
              tag: "Status",
              data: [
                {
                  name: "All"
                },
                {
                  name: "On Call"
                },
                {
                  name: "Idle"
                },
                {
                  name: "On Break"
                }
              ]
            }
          ].map(key => (
            <AgentFilter
              tag={key.tag}
              filterData={key.data}
              result={key.result}
            />
          ))}
          <DatePicker changeFn={handleDateChange} date={selectedDate} />
        </FilterActual>

        <ApplyButton>
          <ApplyText>Apply</ApplyText>
        </ApplyButton>
      </FilterContainer>
    );
  })
);
