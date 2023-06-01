import React, { useState, useRef } from 'react';









const Eyedropper = () => {




  const [selectedColor, setSelectedColor] = useState(null);

const canvasRef = useRef(null);

const inputRef = useRef(null);




const MIN_WIDTH = 400;

const MIN_HEIGHT = 300;

const MAX_WIDTH = 600;

const MAX_HEIGHT = 400;




const handleImageLoad = () => {

const canvas = canvasRef.current;

const context = canvas.getContext("2d");

const image = document.getElementById("source-image");




canvas.width = image.width;

canvas.height = image.height;




context.drawImage(image, 0, 0);

};




const handleFileSelect = (event) => {

const fileReader = new FileReader();




fileReader.onload = () => {

const image = new Image();

image.src = fileReader.result;




image.onload = () => {

const canvas = canvasRef.current;

const context = canvas.getContext("2d");




const imageAspectRatio = image.width / image.height;

let targetWidth = image.width;

let targetHeight = image.height;




if (targetWidth < MIN_WIDTH) {

targetWidth = MIN_WIDTH;

targetHeight = targetWidth / imageAspectRatio;

} else if (targetWidth > MAX_WIDTH) {

targetWidth = MAX_WIDTH;

targetHeight = targetWidth / imageAspectRatio;

}

 

// Adjust height if it is below the minimum or above the maximum

if (targetHeight < MIN_HEIGHT) {

targetHeight = MIN_HEIGHT;

targetWidth = targetHeight * imageAspectRatio;

} else if (targetHeight > MAX_HEIGHT) {

targetHeight = MAX_HEIGHT;

targetWidth = targetHeight * imageAspectRatio;

}

canvas.width = targetWidth;

canvas.height = targetHeight;




context.drawImage(image, 0, 0, targetWidth, targetHeight);

};

};




fileReader.readAsDataURL(event.target.files[0]);

};




const handleCanvasClick = (event) => {

const canvas = canvasRef.current;

const context = canvas.getContext("2d");

const rect = canvas.getBoundingClientRect();

const x = event.clientX - rect.left;

const y = event.clientY - rect.top;

const pixelData = context.getImageData(x, y, 1, 1).data;




const color = `#${pixelData[0].toString(16)}${pixelData[1].toString(

16

)}${pixelData[2].toString(16)}`;




setSelectedColor(color);

};




return (

<div style={{ overflow: "hidden" }}>

<input

type="file"

ref={inputRef}

accept="image/*"

onChange={handleFileSelect}

/>

<div style={{ position: "relative" }}>

<canvas

ref={canvasRef}

onClick={handleCanvasClick}

style={{ cursor: "crosshair", display: "block" }}

/>

</div>

{selectedColor && (

<div style={{ marginTop: "10px" }}>

Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>

</div>

)}

</div>

);

};









export default Eyedropper;