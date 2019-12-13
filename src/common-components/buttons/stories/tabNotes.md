# ** Buttons **

Component location: /common-components/buttons

## Button tabs sample code

```

<ButtonTabs
      handleChange={changeHandler}
      tabData={[
        {
          label: "DID POOLS",
          value: 1
        },
        { label: "SEARCH DIDS", value: 0 }
      ]}
    />

```

## Button tabs Properties

```


| Name       | Type          | Default | Description                      |
| ---------- | ------------- | ------- | -------------------------------- |
| tabData    |  array        | default | required, tabs data for btn      |
|handleChange|  Function     |  void   | required, onChange Event tabs    |


```

## Tab Data Properties

```


| Name       | Type          | Default | Description                      |
| ---------- | ------------- | ------- | -------------------------------- |
|  label     |  string       | default | required, label for tab          |
|  value     |  number       | default | required, mode for tab on/off    |
|  style     |  object       | default | custom style for the tab         |


```
