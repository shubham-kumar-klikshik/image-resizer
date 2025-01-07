// App1.tsx

// import Pica from "pica";
// import { useState } from "react";

// function App() {
//   const [originalImage, setOriginalImage] = useState<File | null>(null);
//   const [resizedImageURL, setResizedImageURL] = useState("");

//   const resizeImage = () => {
//     if (!originalImage) return;

//     const pica = new Pica();
//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       img.src = e.target?.result;
//       img.onload = () => {
//         console.log("Done");
//         const canvas = document.createElement("canvas");
//         const width = 2560; // Target width
//         const height = (img.height * width) / img.width; // Maintain aspect ratio
//         canvas.width = width;
//         canvas.height = height;

//         pica
//           .resize(img, canvas)
//           .then((result) => pica.toBlob(result, "image/jpeg", 0.9)) // Adjust quality if needed
//           .then((blob) => {
//             const resizedURL = URL.createObjectURL(blob);
//             setResizedImageURL(resizedURL);
//           })
//           .catch((error) => {
//             console.error("Error resizing image:", error);
//           });
//       };
//     };

//     reader.readAsDataURL(originalImage);
//   };

//   // const downloadImage = () => {
//   //   if (resizedImage) {
//   //     const a = document.createElement("a");
//   //     a.href = resizedImage;
//   //     a.download = "resized-image.jpg";
//   //     a.click();
//   //   }
//   // };

//   return (
//     <div>
//       <h1>Image Resizer</h1>
//       <input
//         type="file"
//         accept="image/*"
//         // onChange={(event) => {
//         //   const file = event.target?.files?.[0];
//         //   if (file) {
//         //     setOriginalImage(file);
//         //   }
//         // }}
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) {
//             const img = new Image();
//             console.log(URL.createObjectURL(file));
//             img.src = URL.createObjectURL(file);
//             // img.onload = () => setOriginalImage(img);
//           }
//         }}
//       />
//       <button onClick={resizeImage} disabled={!originalImage}>
//         Resize Image
//       </button>
//       {resizedImageURL && (
//         <div>
//           <h2>Resized Image:</h2>
//           <img src={resizedImageURL} alt="Resized" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
