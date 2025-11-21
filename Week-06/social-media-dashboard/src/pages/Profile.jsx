import React, { useEffect } from 'react' // Update import
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from '../store/index.js'
import ProfileCard from '../components/ProfileCard.jsx'
import ToDoList from '../components/ToDoList.jsx'

export default function Profile() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    // Users already fetched in Feed
  }, [])

  return (
    <div className="p-4">
      <h2>Profile</h2>
      <ToDoList />
      <h3>Users to Follow</h3>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id}>
            <ProfileCard user={user} />
           
          </div>
        ))}
      </div>
    </div>
  )
}