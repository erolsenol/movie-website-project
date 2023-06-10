const url = process.env.BASE_URL

export default async function handle(req, res) {
  const { page, limit, genres } = req.query

  const config = {
    method: 'POST',
    body: JSON.stringify({ genres: [genres] })
  }

  try {
    const moviesRes = await (await fetch(`${url}v1/movies/filter?page=${page}&limit=${limit}`, config)).json()

    const data = {
      results: moviesRes.results,
      page: moviesRes.page,
      limit: moviesRes.limit,
      totalPages: moviesRes.totalPages
    }

    res.statusCode = 200
    res.json(data)
  } catch (error) {
    console.log('error', error)
    res.statusCode = 500
    res.json({ error: 'Interval Server Error' })
  }
}
