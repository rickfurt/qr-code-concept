import './App.scss';
import {useState} from "react";
import {HexColorPicker} from "react-colorful";

const QRCode = require('qrcode.react');

function App() {
  const [bgColor, setBgColor] = useState('#0000FF00')
  const [fgColor, setFgColor] = useState('#000000')
  const [filename, setFilename] = useState('')
  const [url, setUrl] = useState('')
  const [logoSize, setLogoSize] = useState(20)

  const save = e => {
    e.target.toBlob((blob) => {
      let URLObj = window.URL || window.webkitURL;
      let a = document.createElement("a");
      a.href = URLObj.createObjectURL(blob);
      a.download = `${filename.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // const saveSvg = e => {
  //   const svg = new Blob([e.target], {type: 'image/svg+xml;charset=utf-8'});
  //
  //   console.log(svg)
  //   // let URL = window.URL || window.webkitURL || window;
  //   // let a = document.createElement("a");
  //   // a.href = URL.createObjectURL(e.target);
  //   // a.download = `${filename.toLowerCase()}.svg`;
  //   // document.body.appendChild(a);
  //   // a.click();
  //   // document.body.removeChild(a);
  // }

  return (
    <div className="app">
      <div className="left">
        <div className="input-row">
          <label htmlFor="filename">Filename</label>
          <input name="filename" onChange={e => setFilename(e.target.value)}/>
        </div>
        <div className="input-row">
          <label htmlFor="url">URL</label>
          <input name="url" onChange={e => setUrl(e.target.value)}/>
        </div>
        <div className="input-row">
          <label htmlFor="logo">Logo size</label>
          <input name="logo" type="range" min="20" max="100" onChange={e => setLogoSize(e.target.value)}/>
        </div>
        <div className="input-color">
          <div className="color-picker">
            <p>Background</p>
            <HexColorPicker bgColor={bgColor} onChange={setBgColor}/>
            <input type="text" className="input-hex" value={bgColor} onChange={(e) => setBgColor(e.target.value)}/>
          </div>
          <div className="color-picker">
            <p>Foreground</p>
            <HexColorPicker bgColor={fgColor} onChange={setFgColor}/>
            <input type="text" className="input-hex" value={fgColor} onChange={(e) => setFgColor(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="right" style={{marginTop: '100px'}}>
        <a className="qr-code" onClick={e => save(e)}>
          <QRCode
            bgColor={bgColor}
            fgColor={fgColor}
            value={url}
            size='256'
            level='H'
            imageSettings={{
              src: "/logo.png",
              excavate: true,
              width: logoSize,
              height: logoSize
            }}
          />
        </a>
        <ol>
          <li>Fill the fields on left side.</li>
          <li>Click on the image to download.</li>
        </ol>
      </div>
    </div>
  )
    ;
}

export default App;