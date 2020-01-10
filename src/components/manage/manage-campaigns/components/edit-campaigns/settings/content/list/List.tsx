import React, { useContext } from "react";
import Top from "./components/Top";
import Table from "./components/ListTable";
import { SearchBar } from "common-components";
import { Divider } from "@material-ui/core";
import Upload from "./upload";
import { store } from "./store";
const List: React.FC = () => {
  const { state } = useContext(store) as any;

  const renderList: Function = () => (
    <>
      <Top />
      <Divider />
      <SearchBar
        title="list"
        userData={[]}
        headers={["id", "name"]}
        loading={false}
      />
      <Table />
    </>
  );

  return <>{state.list ? renderList() : <Upload />}</>;
};

export default List;
