import {Observable} from './helpers'

const httpService = options => {
  return new Observable(observer => {
    let subscribed = true
    const xhr = new XMLHttpRequest()

    xhr.open( options.method, options.url, true)
    xhr.onload = () => {
      if (xhr.status === 200 && subscribed) {
        observer.next(JSON.parse(xhr.responseText))
        observer.complete()
      }
      else {
        if(subscribed) {
          observer.error(xhr.status)
        }
      }
    }
    if (options.method === "POST") {
        xhr.send(JSON.stringify(options.body))
    } else {
        xhr.send();
    }

  return {
    dispose() {
    subscribed = false;
  }}

  })
}

export { httpService }
