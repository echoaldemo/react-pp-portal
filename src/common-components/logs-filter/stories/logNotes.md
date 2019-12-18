# ** FilterLog **

Component location: /common-components/buttons

## Filter Log Sample Code

```
<FilterLog
data={this.state.changelogData}
originalData={this.state.originalChangeLogData}
handleFilterUpdate={this.handleFilterUpdate}
modalFunc={this.setActiveData} />

```

## Filter Log Properties

```


| Name               | Type     | Default | Description            |
| ------------------ | -------- | ------- | ---------------------- |
| data               | array    | -----   | Data of the change log |
| originalData       | array    | -----   | Data of the change log |
| handleFilterUpdate | function | -----   | Function result        |
| modalFunc          | function | -----   | sets active data       |
```
