import  { useState, useRef } from "react";
import { db } from '../firebase'; 
import { doc, setDoc,getDoc } from "firebase/firestore"; 

const Eyedropper = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save user data to Firestore
    // db.collection('users')
    //   .add({
    //     username,
    //     email,
    //   })
    //   .then(() => {
    //     console.log('User data saved successfully');
    //     // Perform any additional operations after saving user data if needed
    //   })
    //   .catch((error) => {
    //     console.error('Error saving user data:', error);
    //   });
    await setDoc(doc(db, "colors","hashValue"), {
      username: username,
      email: email,
     
    });

  };

  const getData = async () =>{
    const docRef = doc(db, "colors","hashValue");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

  }




  const canvasRef = useRef(null);

  const inputRef = useRef(null);

  const MIN_WIDTH = 400;

  const MIN_HEIGHT = 300;

  const MAX_WIDTH = 600;

  const MAX_HEIGHT = 400;

  // const handleImageLoad = () => {
  //   const canvas = canvasRef.current;

  //   const context = canvas.getContext("2d");

  //   const image = document.getElementById("source-image");

  //   canvas.width = image.width;

  //   canvas.height = image.height;

  //   context.drawImage(image, 0, 0);
  // };

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
          Selected Color:{" "}
          <span style={{ color: selectedColor }}>{selectedColor}</span>
        </div>
      )}

<div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
      <button onClick={getData}>Get Data</button>
    </div>
    </div>
  );
};

export default Eyedropper;
