# **CustomCard**

## Sample Code

```
import CustomCard from "./common-components/card";
import CardHeader from ".common-components/card/cardheader";
import CardBody from "./common-components/card/cardbody";
import CardNoResult from "./common-components/card/noresult";

<CustomCard>
    <CardHeader
      title="Active phrase books" searchData={[
                    { id: 1, name: "John" },
                    { id: 2, name: "Doe" },
                    { id: 2, name: "Doe" }
                  ]}
      searchHeaders={["name"]}
      />
     <CardBody>
        <AsyncTable
                  tableData={[
                    { id: 1, name: "John" },
                    { id: 2, name: "Doe" },
                    { id: 2, name: "Doe" }
                  ]}
                  render={(list, { row, cell }) => {
                    return list.map(item => (
                      <TableRow className={row} key={item.id}>
                        <TableCell className={cell}>{item.name}</TableCell>
                        <TableCell
                          className={cell}
                          style={{ textAlign: "right" }}
                        >
                          <IconButton style={{ padding: 0 }}>
                            <SettingsIcon style={{ fontSize: 19 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ));
                  }}
                />
    </CardBody>
</CustomCard>

```

### Props

## CardHeader

| Name         | Type   | Default |
| ------------ | ------ | ------- |
| title        | string |
| searchData   | array  | []      |
| searchHeader | array  | []      |
| addButton    | bool   |
| addFunction  | func   |

## CardBody

> No props

## CardNoResult

> No props
