import React, { useState } from 'react';
import AxiosInstance from '../components/Axios'; // Adjust the import path as needed

const Create = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Store the file object, not the URL
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !image) {
      setError('Please add some text or upload an image to create a post.');
      return;
    }
<<<<<<< HEAD

    const formData = new FormData();
=======
    
    const formData = new FormData();

>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }
<<<<<<< HEAD

    try {
      const response = await AxiosInstance.post('/posts/', formData, {
=======
    
    try {
      const response = await AxiosInstance.post('/tweet/tweets/', formData, {
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
<<<<<<< HEAD
=======
      console.log(response.data)
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
      setSuccessMessage('Post created successfully!');
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="What's on your mind?"
            rows="4"
            className="w-full p-3 rounded-lg bg-[#020202] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9A48D0] transition-all duration-300"
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 ${image ? 'hidden' : 'block'}`}>
              <span>Upload an image</span>
            </div>
            {image && (
              <img
                src={URL.createObjectURL(image)} // Use createObjectURL to show the image preview
                alt="Selected"
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#9A48D0] text-white p-3 rounded-lg hover:bg-[#7a3ab3] transition-all duration-300 active:scale-95"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
