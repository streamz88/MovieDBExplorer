import ENV from  '../jsconfig.json'
import { httpService } from  './networking'
import { ListView } from  './template'
import { renderView } from  './helpers'

const generateQuery  = terms => {
     let query = `query=${terms}`
     return query;
}

const Search =  terms  =>{
  if (terms !== '') {
    let subscription =
      httpService({
        method: 'GET',
        url: `${ENV.api_url_prefix}search/movie?api_key=${ENV.api_key}&language=en-US&${generateQuery(terms)}&page=1&include_adult=false`
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

export { generateQuery, Search }
