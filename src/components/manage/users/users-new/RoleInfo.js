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

  switch (pk) {
    case 3:
      {
        definition = [
          "This role is intended for the U.S based customer success team.",
          "NEVER GIVE A CUSTOMER THIS ROLE!!!"
        ];
        permission = [
          {
            title: "User Management",
            data: [
              "Create/Edit/View Company Managers",
              "Create/Edit/View Campaign Managers",
              "Create/Edit/View Location Managers",
              "Create/Edit/View Team Leads",
              "Create/Edit/View Reps"
            ]
          },
          {
            title: "Company Management",
            data: [
              "Can create companies",
              "Can view any company",
              "Can edit any company",
              "Can assign any company to any user"
            ]
          },

          {
            title: "Campaign Management",
            data: [
              "Can create campaigns",
              "Can view any campaign",
              "Can edit any campaign",
              "Can assign a campaign to any user"
            ]
          },
          {
            title: "Location Management",
            data: [
              "Can create locations",
              "Can view any location",
              "Can edit any location",
              "Can assign location to any user",
              "Can assign a location a Location Manager"
            ]
          },

          {
            title: "Team Management",
            data: [
              "Can create teams",
              "Can view any team",
              "Can edit any team",
              "Can assign a team to any user",
              "Can assign a team a Team Leader"
            ]
          }
        ];
      }
      break;
    case 4:
      {
        definition = [
          "This role is intended for users that need to manage companies as a whole."
        ];
        permission = [
          {
            title: "User Management",
            data: ["Has no permission to manage users"]
          },
          {
            title: "Company Management",
            data: ["Create/Edit/View any company"]
          },
          {
            title: "Campaign Management",
            data: ["Create/Edit/View any campaign"]
          },
          {
            title: "Location Management",
            data: ["Has no permissions to manage locations"]
          },
          {
            title: "Team Management",
            data: ["Has no permissions to manage teams"]
          }
        ];
      }
      break;
    case 5:
      {
        definition = [
          "This role is intended for internal users who need to be able to manage any campaign.",
          "This is a good role for pitch writers and data managers.",
          "NEVER GIVE A CUSTOMER THIS ROLE!!!"
        ];
        permission = [
          {
            title: "",
            data: ["Create/Edit/View any campaign"]
          }
        ];
      }
      break;
    case 6:
      {
        definition = [
          "This role is intended for users that require the highest level of authority for a specific location only.",
          "When setting up licensing customers who run their own callcenters, use this role."
        ];
        permission = [
          {
            title: "User Management",
            data: [
              "Create/Edit/View Team Leads within their location",
              "Create/Edit/View Reps within their location"
            ]
          },
          {
            title: "Company Management",
            data: ["View/Edit the company they are assigned to"]
          },
          {
            title: "Campaign Management",
            data: ["View/Edit campaigns they are assigned to"]
          },
          {
            title: "Location Management",
            data: ["View/Edit assigned location only"]
          }
        ];
      }
      break;
    case 7:
      {
        definition = [
          "This role is intended for users that will be managing a team of reps at specific location."
        ];
        permission = [
          {
            title: "User Management",
            data: ["Create/Edit/View reps that are within their team"]
          },
          {
            title: "Company Management",
            data: ["Can view only the company they are assigned to"]
          },
          {
            title: "Campaign Management",
            data: ["Can view only the campaigns they are assigned to"]
          },
          {
            title: "Location Management",
            data: ["Can view only the location they are assigned to"]
          },
          {
            title: "Team Management",
            data: [
              "Can view teams in their location",
              "Can edit the team they are the leader of"
            ]
          }
        ];
      }
      break;
    case 8:
      {
        definition = [
          "A Perfect Pitch Rep that will be dialing using the Perfect Pitch Platform."
        ];
        permission = [
          {
            title: "",
            data: [
              "View their Location Manager",
              "View Team Leads within their location",
              "View other Reps within their team"
            ]
          }
        ];
      }
      break;
    case 9: {
      definition = [
        "This role is intended for clients that are not licensing customers, and will allow them to view their company and campaigns."
      ];
      permission = [
        {
          title: "User Management",
          data: ["Has no permissions to manage users"]
        },
        {
          title: "Company Management",
          data: ["View assigned company only"]
        },
        {
          title: "Campaign Management",
          data: ["View assigned campaigns only"]
        },
        {
          title: "Location Management",
          data: ["Has no permissions to manage locations"]
        },
        {
          title: "Team Management",
          data: ["Has no permissions to manage teams"]
        }
      ];
    }
  }

  return [definition, permission];
};

export { getRoleInfo };
