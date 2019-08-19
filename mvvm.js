class MVVM {
    constructor(options){
        this._options = options
        let data = this._data = options.data()
        Object.keys(data).forEach(key => {
            this._proxy(key)
        })
        observice(data)
        let dom = document.getElementById(options.el)
        new Compile(dom, this)
    }
    _proxy(key){
        Object.defineProperty(this,key,{
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return this._data[key]
            },
            set: function proxySetter(newval) {
                this._data[key] = newval
            }
        })
    }
}
