import React from 'react' // Add import

export default function ProfileCard({ user }) {
    return (
        <div className="bg-gray-100 p-4 rounded">
            <div className="flex-1">
                <h3 className="font-bold">{user.name}</h3>
                <p>@{user.username}</p>
                <p>Email: {user.email}</p>
                <button
                    onClick={() => dispatch(followUser(user.id))}
                    className="ml-auto bg-blue-500 text-white p-1"
                    disabled={user.followed}
                >
                    {user.followed ? 'Followed' : 'Follow'}
                </button>
            </div>
        </div>
    )
}