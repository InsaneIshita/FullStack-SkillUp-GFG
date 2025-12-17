import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likePost, addComment } from '../store/index.js'

export default function Post({ post }) {
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    dispatch(likePost(post.id))
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      dispatch(addComment(post.id, commentText))
      setCommentText('')
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 mb-4 rounded">
      
      <h3 className="font-bold mb-1">{post.title}</h3>
      <p className="mb-2">{post.body}</p>

      <button
        onClick={handleLike}
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mt-2 mb-2"
      >
        Like ({post.likes || 0})
      </button>

      <form onSubmit={handleCommentSubmit} className="mt-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add comment"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-1 rounded"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 ml-2 rounded"
        >
          Comment
        </button>
      </form>

      <ul className="mt-2 space-y-1">
        {post.comments?.map((c, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
            • {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
