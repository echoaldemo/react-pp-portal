# ** Upload **

Component location: /common-components/upload

## Upload sample code

```

<Upload
  accept="audio/*"
  labelText="Data File"
  helperText="A file needed"
  getAudio={e => console.log("I am the file", e)}
/>

```

## Upload Properties

```


| Name       | Type      | Default        | Description                           |
| ---------- | --------- | -------------- | ------------------------------------- |
|   accept   |  string   |     "audio/*"  | required, desired mime type of files  |
| labelText  |  string   |  "File Upload" | required, text for label              |
| helperText |  string   |      null      | optional, text for helper text        |
|  getAudio  | Function  |      void      | required, onChange Event for upload   |




```
