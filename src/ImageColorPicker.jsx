import { useState, useRef } from "react";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const Eyedropper = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [username, setUsername] = useState("");
  const [colorName, setColorName] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [colorValues, setColorValues] = useState([]);
  const [errorMessage,setErrorMessage] = useState("")

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleColorNameChange = (e) => {
    setColorName(e.target.value);
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

    if (username && colorName && selectedColor !== "") {
      await addDoc(collection(db, "colors"), {
        username: username,
        colorName: colorName.toLowerCase(),
        colorCode: selectedColor,
      });
      window.location.reload();
    } else {
      alert("Please fill all the required fields");
    }
  };

  const getData = async () => {
    const docRef = collection(db, "colors");
    const docSnap = await getDocs(docRef);

    let array = [];
    docSnap.forEach((doc) => {
      // console.log(doc.data())
      
      const body = {
        id: doc.id,
        data: doc.data(),
      };
      array.push(body);
      
    });
    if(array.length === 0){
      setErrorMessage("No colors found!")
    }else{

      setColorValues(array);
    }

    

    // const q = query(collection(db, "colors"), where("colorName", "==", "red"));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchValue);
    const q = query(
      collection(db, "colors"),
      where("colorName", "==", searchValue)
    );

    const querySnapshot = await getDocs(q);
    // setColorValues(querySnapshot)

    let array = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const body = {
        id: doc.id,
        data: doc.data(),
      };
      array.push(body);
    });
    if(array.length === 0){
      setErrorMessage("No color matches found!")
    }else{

      setColorValues(array);
    }
    // console.log(colorValues,"colorvdsf")
  };

  const handleDelete = async (id) =>{
    await deleteDoc(doc(db, "colors", id));
    window.location.reload()
    // await getData()




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
    <div style={{ display: "flex", gap: "100px" }}>
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

        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Enter your name*</label>
              <br />
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <br />
              <label>Enter a color name*</label>
              <br />
              <input
                type="text"
                value={colorName}
                onChange={handleColorNameChange}
              />
              <br />
              <label>Selected color code*</label>
              <br />
              <input type="text" readOnly value={selectedColor || ""} />
              <br />
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  color: "white",
                  background: "blue",
                }}
              >
                Save
              </button>
            </form>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <form onSubmit={handleSearch}>
              <label> Search by color</label>
              <br />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <br />
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  color: "white",
                  background: "blue",
                }}
              >
                Search
              </button>
            </form>

            <button
              onClick={getData}
              style={{
                height: "40px",
                marginTop: "20px",
                marginLeft: "10px",
                color: "white",
                background: "blue",
              }}
            >
              Get all colors
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "90px",
          right: "60px",
          height: "580px",
          background: "white",
          width: "250px",
          overflowY: "scroll",
        }}
      >
        <h2 style={{ textDecoration: "underline", color: "black" }}>
          Created colors
        </h2>
        {errorMessage ? 
        <h3 style={{color:"red"}}>{errorMessage}</h3> : ""}
        {colorValues.map((color, index) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={index}
            style={{
              textAlign: "left",
              boxShadow: "20px 20px 50px 10px #caf0f8 inset",
              marginBottom: "30px",
              padding: "15px",
              margin: "10px",
            }}
          >
            <img
              src="./delete.png"
              style={{
                height: "30px",
                width: "30px",
                marginLeft: "160px",
                cursor: "pointer",
              }}
              data-value={color.id}
              onClick={(event) => handleDelete(event.target.getAttribute("data-value"))}
            ></img>
            <h4>Name : {color.data.username}</h4>
            <h4>Color name : {color.data.colorName}</h4>
            <h4>Color code : {color.data.colorCode}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eyedropper;
