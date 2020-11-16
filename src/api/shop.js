const _products = [
    {"id": 1, "title": "Koren", "price": 1150, "inventory": 200},
    {"id": 2, "title": "Ujan Nomo", "price": 570, "inventory": 100},
    {"id": 3, "title": "Medessa", "price": 740, "inventory": 150},
    {"id": 3, "title": "Amin", "price": 860, "inventory": 50}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
  }