import { useState } from "react";

function ImageUploader() {
  const [imgUrl, setImgURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  interface UploadedImageResponse {
    url: string;
  }

  interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleFileUpload = async (event: FileUploadEvent): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time_using_cloudinary");
    data.append("cloud_name", "dsyq2mclc");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsyq2mclc/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const uploadedImageURL: UploadedImageResponse = await res.json();

    setIsLoading(false);
    setImgURL(uploadedImageURL.url);
  };

  console.log(imgUrl, "image");
  return (
    <div className="file-upload">
      <div className="upload-container">
        <div className="upload-icon">
          {isLoading ? (
            "Uploading..."
          ) : imgUrl ? (
            <img src={imgUrl} alt="Uploaded" />
          ) : (
            "No image uploaded"
          )}
        </div>

        <input type="file" onChange={handleFileUpload} className="file-input" />
      </div>
    </div>
  );
}

export default ImageUploader;
