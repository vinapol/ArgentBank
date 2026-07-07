import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { updateProfile, setLoading } from '../store/authSlice'
import { updateUserProfile } from '../services/api'

export default function UserHeader() {
  const { user, token, loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (user) {
      setUserName(user.userName || '')
    }
  }, [user])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!userName.trim()) return
    dispatch(setLoading(true))
    try {
      await updateUserProfile(token, { userName })
      dispatch(updateProfile({ userName }))
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCancel = () => {
    setUserName(user?.userName || '')
    setIsEditing(false)
  }

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User'
    : 'User'

  return (
    <div className="header">
      <h1>
        Welcome back<br />
        {isEditing ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="edit-input"
            autoFocus
          />
        ) : (
          `${displayName}!`
        )}
      </h1>
      {isEditing ? (
        <div className="edit-buttons">
          <button onClick={handleSave} className="edit-button" disabled={loading || !userName.trim()}>
            Save
          </button>
          <button onClick={handleCancel} className="edit-button cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={handleEdit} className="edit-button">
          Edit Name
        </button>
      )}
    </div>
  )
}
