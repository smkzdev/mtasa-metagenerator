# Meta Generator for MTA:SA

Generate the meta.xml file for your resource automatically<br>
Demo: https://youtu.be/ZIF_Iwp7MVI


## Supported file types
| Extension   | Status  |
| :---------- | :--------- | 
| `LUA` | ✅ | 
| `LUAC` | ✅ | 
| `TTF` | ✅ | 
| `EDF` | ✅ | 
| `ODF` | ✅ | 
| `TXD` | ✅ | 
| `DFF` | ✅ | 
| `COL` | ✅ | 
| `XML` | ✅ | 
| `MP3` | ✅ | 
| `WAV` | ✅ | 
| `OGG` | ✅ | 
| `LNG` | ✅ | 
| `FX` | ✅ | 
| `PNG` | ✅ | 
| `JPG` | ✅ | 
| `JPEG` | ✅ | 
| `SVG` | ✅ | 


## Environment Variables
Available settings in the meta.js file
| Variable   | Description  |
| :---------- | :--------- | 
| `mtaExtensions` | A list of extensions to detect | 
| `extensionsFilter` | A table indicating its key as the end of the file and its value as the file type, that is, G for Shared files, for example | 

## Dependencies
| Name   | Download  |
| :---------- | :--------- | 
| `NodeJS` | https://nodejs.org/en/download/current | 

## Usage

Just put meta.js in your resource folder and run it with cmd/terminal<br>
Note: You need to have NodeJS installed.

```bash
node meta.js
```
