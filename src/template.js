import { theMovieDB_image_url } from '../jsconfig'

const SearchBox = () =>
  (`
    <h1> The Movie Explorer </h1>
    <input id="searchBox" placeholder="Enter movie title"/>

  `)

const ListView = (model) => {
  return(`
  <ul>
    ${ model.map( model =>
      (`<li>
          <img src="${theMovieDB_image_url + model.poster_path}"/>
        </li>`
      )
    )}
  </ul>
`)}

const MainView  = ({model = null, error = false}) => {
    return (`
              <div class="movieDB__container">
                <div class="movieDB__search"> ${SearchBox()}</div>
                <div class="movieDB__movie-results"> ${ListView(model)}</div>
              </div>
            `)

}
export { MainView, SearchBox, ListView }
