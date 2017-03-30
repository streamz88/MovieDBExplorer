import './app.styl'
import { renderView } from './helpers'
import { MainView } from './template.js'

const run = (appData) => {
  renderView( '#app', MainView({ model: appData }))
}

export { run }
