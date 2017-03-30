import ENV from  '../jsconfig.json'
import { httpService } from  './networking'
import { ListView } from  './template'
import { renderView } from  './helpers'

/*==============================================================================
 * Queries endpoint against provisioned search terms
 * Defaults to fetching popular-movies when query is empty
 ==============================================================================*/
const Search =  terms  =>{
  if (terms !== '') {
    let subscription =
      httpService({
        method: 'GET',
        url: `${ENV.api_url_prefix}search/movie?api_key=${ENV.api_key}&language=en-US&query=${terms}&page=1&include_adult=false`
      })
      .forEach(
        {
          next(movies) {
            renderView( '.movieDB__movie-results', ListView(movies.results))
          },
          error(err) {
             console.log('No result!')
          },
          complete() {
            subscription.dispose()
          }
      })
    } else {
      let subscription = httpService({
        method: 'GET',
        url: ENV.popular_movies_endpoint
      })
      .forEach(
        {
          next(movies) {
            renderView( '.movieDB__movie-results', ListView(movies.results))
          },
          error(err) {
             console.log('No result!')
          },
          complete() {
            subscription.dispose()
          }
      })
    }
}

export { Search }
