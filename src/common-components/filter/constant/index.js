var Filter = [
  {
    Label: "Sort By User",
    options: [
      {
        display: "Recently Edited",
        value: "-datetime_modified"
      },
      {
        display: "First Name",
        value: "first_name"
      },
      {
        display: "Last Name",
        value: "last_name"
      },
      {
        display: "Email",
        value: "email"
      }
    ]
  },
  {
    Label: "Sort By",
    options: [
      {
        display: "Recently Edited",
        value: "-datetime_modified"
      },
      {
        display: "Name A-Z",
        value: "name"
      },
      {
        display: "Name Z-A",
        value: "-name"
      }
    ]
  },
  {
    Label: "Active Status",
    options: [
      {
        display: "All",
        value: " "
      },
      {
        display: "Active",
        value: "true"
      },
      {
        display: "Inactive",
        value: "false"
      }
    ]
  },
  {
    Label: "Realm",
    options: [
      {
        display: "All",
        value: " "
      }
    ]
  },
  {
    Label: "Company",
    options: [
      {
        display: "All",
        value: " "
      }
    ]
  },
  {
    Label: "Campaign",
    options: [
      {
        display: "All",
        value: " "
      }
    ]
  },
  {
    Label: "Has Company",
    options: [
      {
        display: "All",
        value: " "
      },
      {
        display: "True",
        value: true
      },
      {
        display: "False",
        value: false
      }
    ]
  },
  {
    Label: "Roles",
    options: [
      {
        display: "All",
        value: " "
      }
    ]
  },
  {
    Label: "Status",
    options: [
      {
        display: "Select",
        value: " "
      },
      {
        display: "Active",
        value: "true"
      },
      {
        display: "Inactive",
        value: "false"
      }
    ]
  }
];
export { Filter };
