import { httpService } from './networking'
const fetchPopularMovies = () => {
  const subscription$ =
    httpService({ method: 'GET', url: ENV.popular_movies_endpoint}).forEach(
      {
        next(movies) {
          console.log('***movie results**', movies)
        },
        error(err) {
           console.log('***ERROR --- ', err)
        },
        complete() {}
      }
  )
}
