import React, { useState, useEffect } from 'react';
import { HeartIcon as HeartIconOutline, BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';

const Post = ({ id, user, profilepic, username, postImage, postText, likeCount, postDate, postTime, comments }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(likeCount ?? 0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [postComments, setPostComments] = useState(comments ?? []);
  const [error,setError]=useState("");
  // console.log("THIS IS PROFILE",profilepic)
  const[profile,setProfile]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked_post_${id}`);
    if (hasLiked === 'true') {
      setLiked(true);
    }

    const fetchComments = async () => {
      const response = await AxiosInstance.get('/tweet/comments/by_tweet/', {
        params: { tweet_id: id }
      });
      setPostComments(response.data);
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        try {
          const response = await AxiosInstance.get(`/account/profiles/?user_id=${user.id}`);
          setProfile(response.data[0]);
        } catch (err) {
          console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
          setError('Failed to load tweets');
        }
      }
    };
    fetchProfiles();
  }, [user]);

  const handleLikeClick = async () => {
    try {
      const response = await AxiosInstance.post(`/tweet/tweet/${id}/like/`);
      setLikes(response.data.like_count);
      setLiked(response.data.liked);
      localStorage.setItem(`liked_post_${id}`, response.data.liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleSaveClick = () => setSaved(!saved);
  const handleCommentsToggle = () => setCommentsOpen(!commentsOpen);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/tweet/tweets/${id}/`);
      navigate("/");
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handlePostClick = () => {
    navigate(`/app/post/${id}`);
  };

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      const response = await AxiosInstance.post(`/tweet/comments/`, { comment: commentInput, tweet: id });
      setPostComments([...postComments, { ...response.data, profilePic: profilepic, username }]);
      setCommentInput('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
  // console.log("HELO",profilepic )
  // console.log(profile.image)  
  return (
    <div className="bg-[#1A1B25] text-white p-4 rounded-lg shadow-lg mb-6 relative">
      <div className='bg-[#414354] rounded-3xl p-1 mb-3'>
        <button
          onClick={handleMenuToggle}
          className="absolute top-11 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <EllipsisVerticalIcon className="w-6 h-6" />
        </button>

        <Transition
          show={menuOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute top-12 right-4 bg-[#25262E] rounded-lg shadow-lg border border-gray-700">
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-red-500 hover:bg-[#1A1B25] w-full text-left rounded-t-lg"
            >
              Delete
            </button>
          </div>
        </Transition>

        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={handlePostClick}>
          <div className="flex items-center">
            <img src={profilepic ? profilepic : profile?.image} alt={username} className="w-12 h-12 rounded-full mr-8 mt-3 ml-2" />
            <span className="font-semibold mt-3 ">{username}</span>
          </div>
          <div className="text-gray-400 sm:flex flex-col text-right mr-6 mt-3">
            <span className="text-xs">{postDate}</span>
            <span className="text-xs">{postTime}</span>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={handlePostClick}>
        {postText && <p className="mb-4 text-start">{postText}</p>}
      </div>

      {postImage && <img src={postImage} alt="Post" className="w-full rounded-lg mb-4" />}

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 mt-4">
        <div className="flex flex-1 justify-around space-x-4">
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-1 transition-all duration-300 transform ${liked ? 'scale-125 text-red-500' : 'hover:text-[#9A48D0] active:scale-90'}`}
          >
            {liked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIconOutline className="w-6 h-6" />}
            <span className="text-sm">{likes}</span>
          </button>
          <button
            onClick={handleCommentsToggle}
            className="flex items-center space-x-1 transition-all duration-300 hover:text-[#9A48D0]"
          >
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            <span className="text-sm">Comments</span>
          </button>
          <button
            onClick={handleSaveClick}
            className={`flex items-center space-x-1 transition-all duration-300 ${saved ? 'text-yellow-500' : 'hover:text-[#9A48D0]'}`}
          >
            {saved ? <BookmarkIconSolid className="w-6 h-6" /> : <BookmarkIconOutline className="w-6 h-6" />}
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center space-x-1 transition-all duration-300 hover:text-[#9A48D0]">
            <ShareIcon className="w-6 h-6" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      <Transition
        show={commentsOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="mt-4 bg-[#25262E] p-4 rounded-lg">
          <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 mb-4">
            <textarea
              value={commentInput}
              onChange={handleCommentInputChange}
              rows="3"
              placeholder="Write a comment..."
              className="w-full p-2 rounded-lg bg-[#1A1B25] text-white border border-gray-700 focus:outline-none focus:border-[#9A48D0] transition-colors"
            />
            <button type="submit" className="px-4 py-2 bg-[#9A48D0] text-white rounded-lg hover:bg-[#8a3cdb] transition-colors">
              Post
            </button>
          </form>
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 mb-2">
                <img src={comment.profilePic} alt={comment.user} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold">{comment.username}</p>
                  <p className="text-gray-400">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Post;
