# ** Metrics Card **

Component location: /common-components/metrics-card

## Sample Code

````
  <MetricsCard
      title="Sales / Billable hours"
      percentage={0.0}
      mode="bills"
      status="none"
      handleClick={chartOpenHandler()}
    />

    ```

````

### Props

| Name        | Type          | Default | Description                      |
| ----------- | ------------- | ------- | -------------------------------- |
| title       | string        | ------- | required, title of the card      |
| percentage  | number/string | ------- | required, the percentage shown   |
| mode        | string        |         | required, bills,sales            |
| status      | string        |         | required, increase,decrease,none |
| handleClick | Function      | void    | required, onClick Event          |

```

```
