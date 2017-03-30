import './app.styl'
import { renderView, Observable} from './helpers'
import { Search } from './moviesDBUtils'
import { MainView } from './template.js'
import ENV from '../jsconfig.json'

const setupSignals = () =>{
  const searchInput = document.querySelector('#searchBox')
  const keyPresses = Observable.fromEvent(searchInput, 'keyup')

  keyPresses.forEach( e => {
    Search(searchInput.value)
  })
}

const run = (appData) => {
  renderView( '#app', MainView({ model: appData }))
  setupSignals()
}

export { run }
