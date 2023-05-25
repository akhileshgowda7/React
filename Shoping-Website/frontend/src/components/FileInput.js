import FileInput from 'react-file-input';
import axios from 'axios';
import React from 'react';

function MyFileInput(setImage, setUploading) {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        // Handle the file
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <div>
            <FileInput
                name="myFile"
                accept=".jpg,.jpeg,.png"
                placeholder="Choose file"
                className="my-file-input"
                onChange={handleFileChange} />
        </div>
    );
}
export default MyFileInput;
// Usage in your component
