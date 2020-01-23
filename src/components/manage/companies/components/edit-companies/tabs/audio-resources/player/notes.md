# ** Custom - Audio Player ** #
Component location: /manage/manage-companies/audio-resources/Player

## Sample Code

``` 
    <AudioPlayer
     uploadModal={uploadModal}
     data={audio}
     name={audio.name}
     src={audi.file ? audi.file.original_url : ""}
    />
    ```

```
### Props

| Name        | Type     | Default | Description                                                                                   |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| uploadModal | function | ------- | required, in case there is no audio, a button to upload will appear and execute this function |
| data        | array    | ------- | required, the returned audio data from the api                                                |
| name        | string   |         | required, audio name                                                                          |
| src         | string   |         | required, audio src or link to the audio                                                      |
```