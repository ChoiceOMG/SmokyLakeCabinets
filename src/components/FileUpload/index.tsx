import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = 'c127d55ce0be2a44907493c3180b2890';
const uploadURL = 'https://api.imgbb.com/1/upload';

interface FileUploadProps {
  onUploadSuccess: (data: any) => void;
  classes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, classes }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

 const handleFileUpload = async () => {
  if (selectedFile) {
    // Display loading toast notification
    const toastId = toast.loading('Uploading file...', { autoClose: false });

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(uploadURL, formData, {
        params: {
          key: API_KEY,
          expiration: 3600,
        },
      });

      const { data } = response;
      if (data.success) {
        // Close the loading toast notification
        toast.dismiss(toastId);

        // Show success toast notification
        toast.success('File uploaded successfully');

        onUploadSuccess(data.data);
      } else {
        console.log('File upload failed:', data.error);
        // Close the loading toast notification and show an error toast notification
        toast.dismiss(toastId);
        toast.error('File upload failed');
      }
    } catch (error) {
      console.error('File upload failed:', error);
      // Close the loading toast notification and show an error toast notification
      toast.dismiss(toastId);
      toast.error('File upload failed');
    }
  }
};


  useEffect(() => {
    handleFileUpload();
  }, [selectedFile]);

  return (
    <input
      type="file"
      className={`block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 ${classes || ''}}`}
      onChange={handleFileChange}
    />
  );
};

export default FileUpload;
