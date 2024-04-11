import React, { useRef, useEffect, useState } from 'react';
import 'aframe';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mountain from './models/mountain.glb';
import carpet from './models/carpet.glb';
import gallery from './models/gallery.glb';


import sky from "./assets/sky.jpg";

import useSpeechRecognition from './useSpeechRecognition'; 




const images = [
  { 
    id: 1, 
    src: 'https://miro.medium.com/v2/resize:fit:1200/0*j7sVnq-dE0XWdS12.jpeg', 
    info: 'Information 1',
    
  },
  { 
    id: 2, 
    src: 'https://static.wikia.nocookie.net/onepiece/images/8/87/One_Piece_Anime_Logo.png', 
    info: 'Information 2',
   
  },
  { 
    id: 3, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
  { 
    id: 4, 
    src: 'https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg', 
    info: 'Information 3',
    
  },
];

const positions = [
  {
    customPosition: {x:-24.9, y: 5, z: 20 }, // Define custom position
    customRotation: { x: 0, y: 90, z: 0 } // Define custom rotation
  },
  {
    customPosition: { x: -24.9, y: 5, z: 10 }, // Define custom position
    customRotation: { x: 0, y: 90, z: 0 } // Define custom rotation
  },
  {
    customPosition: { x: -24.9, y: 5, z: 0}, // Define custom position
    customRotation: { x: 0, y: 90, z: 0 } // Define custom rotation
  },
  {
    customPosition: { x: -24.9, y: 5, z: -10}, // Define custom position
    customRotation: { x: 0, y: 90, z: 0 } // Define custom rotation
    
  },
  {
    customPosition: { x: -24.9, y: 5, z: -20}, // Define custom position
    customRotation: { x: 0, y: 90, z: 0 } // Define custom rotation
  }
  ,
  {
    customPosition: { x: -20.9, y: 5, z: -24.9}, // Define custom position
    customRotation: { x: 0, y: 0, z: 0 } // Define custom rotation
  },
  {
    customPosition: { x: -10.9, y: 5, z: -24.9}, // Define custom position
    customRotation: { x: 0, y: 0, z: 0 } // Define custom rotation
  },
  {
    customPosition: { x: -0.9, y: 5, z: -24.9}, // Define custom position
    customRotation: { x: 0, y: 0, z: 0 } // Define custom rotation
  },
  {
    
      customPosition: { x: 10, y: 5, z: -24.9}, // Define custom position
      customRotation: { x: 0, y: 0, z: 0 } // Define custom rotation
    
  },
  {
    
    
      customPosition: { x: 20, y: 5, z: -24.9}, // Define custom position
      customRotation: { x: 0, y: 0, z: 0 } // Define custom rotation
    
  
  }

]




function App() {
  const loader = new GLTFLoader();
  const mountainRef = useRef(null);
  const cameraRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, z: 0 });
  const [popupRotation, setPopupRotation] = useState({ x: 0, y: 0, z: 0 });

  const [popupInfo, setPopupInfo] = useState('');
  const [listening, setListening] = useState(false);
  const [movingForward, setMovingForward] = useState(false);
  const [plane , setPlane] = useState("mountain");


  const combinedData = images.map((image, index) => ({
    ...image,
    ...positions[index]
  }));

  console.log("room activated")
  useEffect(() => {
  if(localStorage.getItem('plane') == "carpet"){

    loader.load(gallery, (d) => {
      const mountainEntity = mountainRef.current.object3D;
      mountainEntity.add(d.scene);
    });

   
    

  }else{
    loader.load(mountain, (d) => {
      const mountainEntity = mountainRef.current.object3D;
      mountainEntity.add(d.scene);
    });

  
  }

  }, [loader]);



  const handleImageClick = (position, info , rotation) => {
    const offset = 2; // Adjust as needed to position the pop-up in front of the image
    const popupX = position.x;
    const popupY = position.y;
    const popupZ = position.z 
    const rotateZ = rotation.z 
  
    setShowPopup(true);
    setPopupPosition({ x: popupX, y: popupY, z: popupZ });
    setPopupRotation({x:rotation.x , y:rotation.y , z:rotation.z})
    setPopupInfo(info);
  };
  
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  // Speech recognition setup
  const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition(); // Use the custom hook

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening, startListening, stopListening]);

  useEffect(() => {
    if (transcript === 'move forward') {
      moveCameraForward() // Simulate pressing 'w' key for 1 second
      console.log("move forward")
      resetTranscript();
    } else if (transcript === 'move backward') {
      moveCameraBackward(); // Simulate pressing 's' key for 1 second
      console.log("move backword")

      resetTranscript();
    }else if(transcript === "room") {
      console.log("room")
      if(localStorage.getItem('plane')==="carpet"){
        localStorage.setItem('plane', 'mountain');

      }else{

        localStorage.setItem('plane', 'carpet');
      }
      window.location.reload();

      resetTranscript();

    }
  }, [transcript, resetTranscript]);
 
  const moveCameraForward = () => {
    const cameraEntity = cameraRef.current.object3D;
    let stepCount = 0; // Initialize step count
  
    const moveStep = () => {
      if (cameraEntity && stepCount < 20) { // Repeat 20 times
        // Get the current position and rotation of the camera
        const currentPosition = cameraEntity.position.clone();
        const currentRotation = cameraEntity.rotation.clone();
  
        // Calculate the movement vector based on the camera's rotation
        const deltaX = -0.5 * Math.sin(currentRotation.y);
        const deltaZ = -0.5 * Math.cos(currentRotation.y);
  
        // Update the camera position relative to the ground plane
        cameraEntity.position.x += deltaX;
        cameraEntity.position.z += deltaZ;
  
        stepCount++;
      } else {
        clearInterval(moveInterval); // Stop the interval once step count reaches 20
      }
    };
  
    const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
  };
  
  const moveCameraBackward = () => {
    const cameraEntity = cameraRef.current.object3D;
    let stepCount = 0; // Initialize step count
  
    const moveStep = () => {
      if (cameraEntity && stepCount < 20) { // Repeat 20 times
        // Get the current position and rotation of the camera
        const currentPosition = cameraEntity.position.clone();
        const currentRotation = cameraEntity.rotation.clone();
  
        // Calculate the movement vector based on the camera's rotation
        const deltaX = 0.5 * Math.sin(currentRotation.y);
        const deltaZ = 0.5 * Math.cos(currentRotation.y);
  
        // Update the camera position relative to the ground plane
        cameraEntity.position.x += deltaX;
        cameraEntity.position.z += deltaZ;
  
        stepCount++;
      } else {
        clearInterval(moveInterval); // Stop the interval once step count reaches 20
      }
    };
  
    const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
  };
  
  

  const toggleListening = () => {
    setListening(!listening);
  };

  
  return (
    <div style={{ paddingTop: "100px" }}>
      <div style={{ position: 'absolute', top: '45px', left: '10px', zIndex: '9999' }}>
  <button onClick={toggleListening} style={{padding:"0.5rem",fontSize:"1rem" ,borderRadius:"10px" , border:"none",color:"white",fontWeight:"bold" ,background: 'rgba(25,25,25,0.5)',}}>{listening ? "Stop Listening" : "Start Listening"}</button>
</div>
      <a-scene cursor="rayOrigin: mouse">
        <a-assets>
          <img id="sky" src={sky} />
        </a-assets>
        <a-sky color="#FFFFFF" material="src: #sky" rotation="0 0 0" />
        <a-entity
          color="#FFFFFF"
          id="mountain"
          position="0 0 0"
          scale={ localStorage.getItem('plane') === "carpet" ? "5 5 5" : "15 15 15"}
          ref={mountainRef}
        />
        <a-camera ref={cameraRef} position="0 3 20"></a-camera>
        {combinedData.map((image) => (
  <a-image
    key={image.id}
    src={image.src}
    width="6"
    height="5"
    position={`${image.customPosition.x} ${image.customPosition.y} ${image.customPosition.z}`} // Use custom position values
    rotation={`${image.customRotation.x} ${image.customRotation.y} ${image.customRotation.z}`} // Use custom rotation values
    style={{ cursor: 'pointer' }}
    onClick={() => handleImageClick(image.customPosition, image.info,image.customRotation ,image.id)}
  />
))}

{showPopup && (
          <a-entity
            id="infoPanel"
            position={`${popupPosition.x} ${popupPosition.y} ${popupPosition.z}`}
            rotation={`${popupRotation.x} ${popupRotation.y} ${popupRotation.z}`}
            geometry="primitive: plane; width: 6; height: 5; radius: 0.1"
            material="color: #ffffff; shader: flat; opacity: 0.7; transparent: true"
          >
            {/* Close button */}
            <a-entity
              id="closeButton"
              position="2 2 0.3"
              geometry="primitive: plane; width: 0.5; height: 0.5"
              material="color: #ff0000; shader: flat"
              onClick={handleClosePopup}
              events={{ click: handleClosePopup }}
            >
              <a-text value="X" align="center" color="#ffffff"></a-text>
            </a-entity>

            {/* Popup content */}
            <a-text value={popupInfo} align="center" color="black" wrap-count="20" position="0 0.5 0.3"></a-text>

            {/* Button */}
            <a-entity
              id="popupButton"
              position="0 -0.5 0.1"
              geometry="primitive: plane; width: 2; height: 0.5"
              material="color: #0088ff; shader: flat"
              onClick={handleButtonClick}
            >
              <a-text value="Click Me!" align="center" color="#ffffff"></a-text>
            </a-entity>

           
          </a-entity>
        )}

      </a-scene>
    </div>
  );
}

export default App;
