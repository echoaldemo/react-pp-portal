import React from "react";
import Helmet from "react-helmet";

const SEO = ({ title }) => {
  return <Helmet title={title ? title : "Portal"} />;
};

export default SEO;
