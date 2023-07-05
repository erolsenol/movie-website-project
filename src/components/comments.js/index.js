import { useState, useEffect } from 'react'
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { createComment, deleteComment, updateComment, getComment } from '../../pages/api/comments'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const data = await getComment()
      setComments(data.comments)
    } catch (error) {
      setError('Yorumlar yüklenirken bir hata oluştu.')
    }
  }

  const handleCreateComment = async () => {
    if (newComment.trim() === '') {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await createComment(newComment)
      setComments([...comments, data.comment])
      setNewComment('')
    } catch (error) {
      setError('Yorum oluşturulurken bir hata oluştu.')
    }

    setIsLoading(false)
  }

  // const handleDeleteComment = async commentId => {
  //   setIsLoading(true)
  //   setError('')

  //   try {
  //     await deleteComment(commentId)
  //     setComments(comments.filter(comment => comment.id !== commentId))
  //   } catch (error) {
  //     setError('Yorum silinirken bir hata oluştu.')
  //   }

  //   setIsLoading(false)
  // }

  const handleUpdateComment = async (commentId, newContent) => {
    setIsLoading(true)
    setError('')

    try {
      const data = await updateComment(commentId, newContent)
      setComments(
        comments.map(comment => (comment.id === commentId ? { ...comment, content: data.comment.content } : comment))
      )
    } catch (error) {
      setError('Yorum güncellenirken bir hata oluştu.')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <TextField
        label='Yorum ekle'
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        variant='outlined'
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleCreateComment}
        disabled={isLoading || newComment.trim() === ''}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Yorum Gönder'}
      </Button>

      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              {/* <div>{comment.content}</div> */}
              <Button
                variant='contained'
                color='secondary'
                // onClick={() => handleDeleteComment(comment.id)}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Sil'}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleUpdateComment(comment.id, 'Yeni içerik')}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Güncelle'}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz yorum yok.</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Comments
