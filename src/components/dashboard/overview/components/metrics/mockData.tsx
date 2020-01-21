interface Obj {
  [index: string]: any;
}

const campaign: Array<Obj> = [
  {
    title: "Sales / Billable hours",
    percentage: 12.22,
    mode: "bills",
    status: "decrease"
  },
  {
    title: "Revenue / Billable",
    percentage: 12.22,
    mode: "bills",
    status: "increase"
  },
  {
    title: "Sales",
    percentage: 12.22,
    mode: "sales",
    status: "decrease"
  },
  {
    title: "Revenue",
    percentage: 12.22,
    mode: "sales",
    status: "increase"
  },
  {
    title: "Sales",
    percentage: 12.22,
    mode: "sales",
    status: "decrease"
  },
  {
    title: "Revenue",
    percentage: 12.22,
    mode: "sales",
    status: "increase"
  }
];
const dialer: Array<Obj> = [
  {
    title: "Sales / Billable hours",
    percentage: 12.22,
    mode: "bills",
    status: "decrease"
  },
  {
    title: "Revenue / Billable",
    percentage: 12.22,
    mode: "bills",
    status: "increase"
  },
  {
    title: "Sales",
    percentage: 12.22,
    mode: "sales",
    status: "decrease"
  },
  {
    title: "Revenue",
    percentage: 12.22,
    mode: "sales",
    status: "increase"
  }
];
const agent: Array<Obj> = [
  {
    title: "Sales / Billable hours",
    percentage: 12.22,
    mode: "bills",
    status: "decrease"
  },
  {
    title: "Revenue / Billable",
    percentage: 12.22,
    mode: "bills",
    status: "increase"
  }
];

export { campaign, dialer, agent };
