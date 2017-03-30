/*==============================================================================
Update Dom
================================================================================*/
const renderView =  (selector, template) => {
  let body = document.querySelector(selector)
  body.innerHTML = template
}

/*==============================================================================
Observable Interface Implementation
================================================================================*/

function Observable(forEach) {
  this._forEach = forEach
}


Observable.fromEvent = function (dom, eventName) {
  return new Observable(function forEach(observer) {
    var handler = function handler(e) {
      return observer.onNext(e)
    }
    dom.addEventListener(eventName, handler)

    return {
      dispose: function dispose() {
        dom.removeEventListener(eventName, handler)
      }
    }
  })
}

Observable.prototype.forEach = function (observerOrOnNext, onError, onCompleted) {
  if (typeof observerOrOnNext === "function") {
    return this._forEach({
      onNext: observerOrOnNext,
      onError: onError || function () {},
      onCompleted: onCompleted || function () {}
    })
  } else {
    return this._forEach(observerOrOnNext)
  }
}


export { renderView, Observable }
