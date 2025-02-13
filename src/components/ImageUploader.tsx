// import { useState } from "react";

// function ImageUploader() {
//   const [imgUrl, setImgURL] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   interface UploadedImageResponse {
//     url: string;
//   }

//   interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
//     target: HTMLInputElement & EventTarget;
//   }

//   const handleFileUpload = async (event: FileUploadEvent): Promise<void> => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     setIsLoading(true);
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "first_time_using_cloudinary");
//     data.append("cloud_name", "dsyq2mclc");

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dsyq2mclc/image/upload",
//       {
//         method: "POST",
//         body: data
//       }
//     );

//     const uploadedImageURL: UploadedImageResponse = await res.json();

//     setIsLoading(false);
//     setImgURL(uploadedImageURL.url);
//   };



//   console.log(imgUrl, "image");
//   return (
//     <div className="file-upload">
//       <div className="upload-container">
//         <div className="upload-icon">
//           {isLoading ? (
//             "Uploading..."
//           ) : imgUrl ? (
//             <img src={imgUrl} alt="Uploaded" />
//           ) : (
//             "No image uploaded"
//           )}
//         </div>

//         <input type="file" onChange={handleFileUpload} className="file-input" />
//       </div>
//     </div>
//   );
// }

// export default ImageUploader;


// import React, { useRef, useEffect } from 'react';
// import JsBarcode from 'jsbarcode';
// import html2canvas from 'html2canvas';

// const BarcodeGenerator = () => {
//   const barcodeRef = useRef(null);

//   useEffect(() => {
//     if (barcodeRef.current) {
//       JsBarcode(barcodeRef.current, '123456789012', {
//         format: 'CODE128',
//         displayValue: true,
//       });
//     }
//   }, []);

  

//   const handleDownload = () => {
//     const container = document.getElementById('barcode-container');
//     if (container) {
//       html2canvas(container).then((canvas) => {
//         const link = document.createElement('a');
//         link.download = 'barcode_and_image.png';
//         link.href = canvas.toDataURL();
//         link.click();
//       });
//     }
//   };
//   console.log(barcodeRef, "barcodeRef")

//   return (
//     <div>
//       <div id="barcode-container">
//         <div style={{ marginBottom: '10px' }}>
//           <svg ref={barcodeRef}></svg>
//         </div>
//         <div>
//           <img src="https://static.stacker.com/s3fs-public/styles/slide_desktop/s3/02LD0JTY.png" alt="User" style={{ width: '100px', height: '100px' }} />
//         </div>
//       </div>
//       <div style={{ marginTop: '10px' }}>
//         <button onClick={handleDownload}>Download Barcode and Image</button>
//       </div>
//     </div>
//   );
// };

// export default BarcodeGenerator;

