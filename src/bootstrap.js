import ENV from '../jsconfig'
import { renderView } from './helpers'
import { httpService } from './networking'
import { MainView } from './template'

const App = require( './app' )

const bootstrap = movies => App.run(movies)

const fetchPopularMovies = () => {
  const subscription$ =
    httpService({ method: 'GET', url: ENV.popular_movies_endpoint}).forEach(
      {
        next(movies) {
          subscription$.dispose()
      	  bootstrap(movies.results)
        },
        error(err) {
           renderView(  '#app', MainView( { error: true } ) )
        },
        complete() {}
      }
  )
}

window.onload = fetchPopularMovies
