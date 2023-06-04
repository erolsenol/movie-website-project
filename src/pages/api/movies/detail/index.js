const url = process.env.BASE_URL

export default async function handle(req, res) {
  const { id } = req.query

  const moviesRes = await (await fetch(`${url}v1/movies/${id}`)).json()

  //   const data = {
  //     results: moviesRes.results,
  //     page: moviesRes.page,
  //     limit: moviesRes.limit,
  //     totalPages: moviesRes.totalPages
  //   }

  res.statusCode = 200
  res.json(moviesRes)
}
