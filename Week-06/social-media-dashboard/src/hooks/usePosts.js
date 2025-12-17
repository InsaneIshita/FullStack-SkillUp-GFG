import React, { useEffect } from 'react' // Add import
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../store/index.js'
import postsData from '../data/posts'

export const usePosts = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(setPosts(postsData))
  }, [dispatch])

  return posts
}