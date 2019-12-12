import styled from "styled-components";

export const PaginationContainer = styled.ul`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 431px;
  min-height: 60px;
  color: #444851;
  padding: 0;
  font-family: "Roboto", sans-serif;
  user-select: none;
  .active {
    background-color: #f89523;
    color: #fff;
    pading: 0 10px 0 10px;
  }
  .item {
    font-size: 16px;
    list-style: none;
    border-radius: 3px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 3px 0 3px;
  }
  .item-ellipsis {
    font-size: 16px;
    list-style: none;
    border-radius: 3px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 3px 0 3px;
    cursor: default;
    &:hover {
      text-decoration: none;
      cursor: text;
    }
  }
`;

export const PageItem = styled.li`
  font-size: 16px;
  &.page_btn:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
  &.disabled:hover {
    text-decoration: none;
  }
`;

export const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  font-size: 16px;
  width: 30px;
  height: 28px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
