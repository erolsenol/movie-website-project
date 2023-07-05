const url = process.env.BASE_URL

// Yorum oluşturma
export async function createComment(content) {
  const config = {
    method: 'POST',
    body: JSON.stringify({ content })
  }

  try {
    const response = await fetch(`${url}v1/comments`, config)
    const data = await response.json()
    console.log('data :>> ', data)
    return data
  } catch (error) {
    console.log('Hata:', error)
    throw new Error('Sunucu hatası')
  }
}

// // Yorum silme
// export async function deleteComment(commentId) {
//   const config = {
//     method: 'DELETE'
//   }

//   try {
//     const response = await fetch(`${url}v1/comments/${commentId}`, config)
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.log('Hata:', error)
//     throw new Error('Sunucu hatası')
//   }
// }

// Yorum güncelleme
export async function updateComment(commentId, content) {
  const config = {
    method: 'PUT',
    body: JSON.stringify({ content })
  }

  try {
    const response = await fetch(`${url}v1/comments/update/${commentId}`, config)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Hata:', error)
    throw new Error('Sunucu hatası')
  }
}

// Yorum getirme
export async function getComment() {
  try {
    const response = await fetch(`${url}v1/comments`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Hata:', error)
    throw new Error('Sunucu hatası')
  }
}
