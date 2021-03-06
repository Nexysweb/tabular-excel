import React from 'react';

import * as Utils from '../utils';
import * as SrtToVtt from '../lib/srt-vtt';

import JSZip from 'jszip';

export const nameToVtt = f => f.replace(/\.[^.]+$/, '.vtt');

const zipFolderFromContentArray = cArray => {
  const zip = new JSZip();
  // create a file and a folder

  cArray.map(c => {
    const { filename, content } = c;

    zip.file(filename, content);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        const url = window.URL.createObjectURL(content);
        window.location = url;
    });

    return true;
  })
}

export default () => {
  const onChange = async event => {
    const { files } = event.target;

    // this function calls `onloadend`
    const r = await Promise.all(Array.from(files).map(async file => {
      //fileReader.readAsText(file);
      const data = await Utils.readFile(file)
      console.log(file.name);

      const j = SrtToVtt.srtToJson(data.split('\r\n'));
      const content = SrtToVtt.jsonToVtt(j);

      const filename = nameToVtt(file.name);

      return {filename, content};
    }));

    zipFolderFromContentArray(r)
  }
  
  const handleClick = a => {
    const data = null;
    if (data === null) {
      alert('no content available')
    }

    try {
      const j = SrtToVtt.srtToJson(data.split('\r\n'));
      const txt = SrtToVtt.jsonToVtt(j);
      Utils.toExportTxt(txt);
    } catch (err) {
      console.log(err)
    }
  }

  const name = 'file';
  return (<>
    <input type="file" name={name} multiple="multiple" onChange={onChange}/>
    <button className="btn btn-primary" type="submit" onClick={handleClick}>
      Download <i className="fa fa-file"/>
    </button>
  </>);
}