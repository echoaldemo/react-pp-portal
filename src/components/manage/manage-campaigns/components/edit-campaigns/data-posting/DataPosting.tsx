import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import { TableLoader, Pagination } from "common-components";
import EditHeader from "../EditHeader";
import RoutesTable from "./components/Table/Table";
import { routes } from "./components/mockRoutes";

const DataPosting = ({ history, match }: any) => {
  const [allRoutes, setRoutes] = useState<any[]>([]);
  const [paginateList, setPaginateList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setRoutes(routes);
      setPaginateList(routes);
      setLoading(false);
    }, 1000);
  }, []);

  const paginate = (from: number, to: number) => {
    setRoutes(paginateList.slice(from, to));
  };

  const handleCreate = (data: any) => {
    setRoutes(allRoutes.concat(data));
  };

  return (
    <div>
      <EditHeader match={match} campaignDetails={null} history={history} />
      {loading ? (
        <TableLoader />
      ) : (
        <Paper square={true} className="mh-normal">
          <RoutesTable
            loading={loading}
            data={allRoutes}
            handleCreate={handleCreate}
            campaignuuid={match.params.uuid}
            slug={match.params.slug}
          />
          <Divider />
          <Pagination
            totalItems={paginateList.length}
            itemsPerPage={10}
            paginateFn={paginate}
          />
        </Paper>
      )}
    </div>
  );
};

export default DataPosting;
