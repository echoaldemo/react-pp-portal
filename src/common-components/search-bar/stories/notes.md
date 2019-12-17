# ** Search Bar **

## Sample Code

```
import SearchBar from "../../common-components/search-bar/SearchBar";

<SearchBar
  title="User"
  userData={this.state.userData}
  headers={"Username, First Name, Last Name"}
/>

--------------- SearchV2 without Link ------------------

 <SearchBar
    title="Global Segment"
    userData={this.state.globalSegment}
    headers={["name", "slug", "uuid"]}
    active={true}
    loading={this.state.loading}
    setActiveDataMethod={this.setActiveDataMethod}
    settings={
      <MenuItem
        onClick={() => this.handleClickOpen(this.state.data)}
        style={{
          color: "#777777",
          width: 250,
          paddingTop: 0,
          paddingBottom: 0
        }}
      >
        <CodeIcon />{" "}
        <Typography style={{ marginLeft: 40 }}>XML</Typography>
      </MenuItem>
    }
  />

  --------------- SearchV2 with Link ------------------

 <SearchBar
    title="Global Segment"
    userData={this.state.globalSegment}
    headers={["name", "slug", "uuid"]}
    active={true}
    loading={this.state.loading}
    link={true}
    pathnameData={{
        firstLink: `/manage/companies/edit/`,
        lastLink: `/settings`
    }}
  />

```

### Props

## SearchBar

| Name                | Type      | Default | Description                                                                                             |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------- |
| title               | string    | ------- | required                                                                                                |
| userData            | array     | ------- | required                                                                                                |
| headers             | string    |         | required                                                                                                |
| active              | boolean   | false   | displaying of active                                                                                    |
| loading             | boolean   | false   | need this prop for v2 of searchbar (disabling the search if loading the data)                           |
| setActiveDataMethod | method    |         | need this prop for v2 of searchbar (this is required if you are setting the data you clicked as active) |
| settings            | component |         | need this prop for v2 of searchbar (this is needed if you want to display gear icon for settings)       |
| link                | boolean   |         | need this prop for v2 of searchbar (using of Link component onclick)                                    |
| pathnameData        | object    |         | need this prop for v2 of searchbar (using of Link component onclick)                                    |
