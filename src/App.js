import "./styles.css";
import { useEffect, useState } from "react";
window.isDraw = false;
window.color = 'black';
window.size =5
export default function App() {
  const [isShowCanvas, setIsShowCanvas] = useState(false);
  const [canvas, setCanvas] = useState(false);
  const [size, setSize] = useState(5);
  useEffect(() => {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext("2d");
    let preX = 0;
    let preY = 0;

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x:
          ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
      };
    }
    function draw(e) {
      // console.log(window.isDraw);
      var pos = getMousePos(canvas, e);

      if (!window.isDraw) {
        preX = pos.x;
        preY = pos.y;
        return;
      }

      // ctx.fillStyle = "#000000";
      // ctx.fillRect(posx, posy, 5, 5);

      // ctx.beginPath();
      // ctx.moveTo(pos.x, pos.y);
      // ctx.lineTo(pos.x + 1, pos.y + 1);
      // ctx.strokeStyle = x;
      // ctx.lineWidth = y;
      // ctx.stroke();
      // ctx.closePath();

      // Start a new Path
      if (preX) {
        ctx.beginPath();
        
        ctx.lineWidth = window.size;
        ctx.moveTo(preX, preY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = window.color;
        ctx.stroke();
      }
      preX = pos.x;
      preY = pos.y;
      setCanvas(canvas);
      // Draw the Path
    }

    canvas.addEventListener(
      "mousemove",
      function (e) {
        draw(e);
      },
      false
    );
    canvas.addEventListener(
      "mousedown",
      function (e) {
        // console.log("xxx");
        window.isDraw = true;
      },
      false
    );
    canvas.addEventListener(
      "mouseup",
      function (e) {
        window.isDraw = false;
      },
      false
    );
    canvas.addEventListener(
      "mouseout",
      function (e) {
        window.isDraw = false;
      },
      false
    );


    canvas.addEventListener('touchstart', ()=>{
      window.isDraw = true;
    });
    canvas.addEventListener('touchend', ()=>{
      window.isDraw = false;
    });
    canvas.addEventListener('touchcancel',  ()=>{
      window.isDraw = false;
    });
    canvas.addEventListener('touchmove',  function (e) {
      draw(e);
    },);


  }, []);
  function downloadImage(data, filename = "untitled.jpeg") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
  function save() {
    downloadImage(canvas.toDataURL("image/png"), "download.jpeg");
  }
  function changeHandler(event) {
    setIsShowCanvas(true)
    const canvas = document.getElementById("canvas");
    let file = event.target.files[0];
    // console.log(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = reader.result;
      // img.crossOrigin = "anonymous";
      img.onload = function () {
        // console.log(img.width, img.height);

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    };
    reader.onerror = function (error) {
      // console.log("Error: ", error);
    };
  }
  return (
    <div className="App">
      <select
        onChange={(e) => {

          window.size =(e.target.value);
          setSize(e.target.value);
        }}
        value={size}
      >
        <option>5</option>
        <option>8</option>
        <option>10</option>
        <option>15</option>
      </select>
      &nbsp;
      {color}
      <input onChange={(e)=>{
        window.color = (e.target.value);
      }} type="color"></input>
      &nbsp;
      <input onChange={changeHandler} type="file" />
      <button onClick={save}>Save</button>
      <canvas className={isShowCanvas?'show':'hide'} id="canvas"></canvas>
    </div>
  );
}
