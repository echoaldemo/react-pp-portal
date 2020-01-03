const getRoleInfo = (pk) => {
  let definition = [
    // "This role is intended for internal users who need to be able to manage any campaign."
  ];

  let permission = [
    // {
    //   title: "User Management",
    //   data: [
    //     "Create/Edit/View Company Managers",
    //     "Create/Edit/View Campaign Managers",
    //     "Create/Edit/View Location Managers",
    //     " Create/Edit/View Team Leads",
    //     " Create/Edit/View Reps"
    //   ]
    // }
  ];

  return [definition, permission];
};

export { getRoleInfo };
