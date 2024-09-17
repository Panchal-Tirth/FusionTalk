// src/pages/Home.jsx
<<<<<<< HEAD
import React from 'react';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';

const Home = () => {
  const posts = [
    {
      id: 1,
      profilePic: '/path/to/profile1.jpg',
      username: 'john_doe',
      postImage: '/path/to/post1.jpg',
      postText: 'Enjoying a beautiful day!',
    },
    {
      id: 2,
      profilePic: '/path/to/profile2.jpg',
      username: 'jane_doe',
      postImage: '/path/to/post2.jpg',
      postText: 'Had a great time at the park.',
    },
    // Add more posts as needed
  ];

  return (
=======
import {React,useEffect,useState }from 'react';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import AxiosInstance from '../components/Axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await AxiosInstance.get('/tweet/tweets/');
        console.log(response.data)
        setPosts(response.data); // Assuming the data is an array of tweet objects
      } catch (err) {
        console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
        setError('Failed to load tweets');
      }
    };

    fetchPosts();
  }, []); // Empty array means this will run once when the component mounts

  if (error) {
    return <div>{error}</div>;
  }


  return (
    
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
    <div className="flex justify-between">
      {/* Left - Posts Section */}
      <div className="w-full md:w-2/3 lg:w-3/5 p-4">
        {posts.map(post => (
          <Post
<<<<<<< HEAD
            key={post.id}
            profilePic={post.profilePic}
            username={post.username}
            postImage={post.postImage}
            postText={post.postText}
=======
            id={post.id}
            profilePic={post.image}
            username={post.user}
            postImage={post.image}
            postText={post.text}
            likeCount={post.likes}
>>>>>>> 62b22c1e28b439d14ec47f201d422990e9ea80ed
          />
        ))}
      </div>

      {/* Right - Suggestions Section */}
      <div className="hidden md:block w-1/3 lg:w-2/5 p-4">
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
