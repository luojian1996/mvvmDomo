let uid = 0

class Watcher {
    constructor (vm,exp,cb) {
        this._cb = cb
        this._vm = vm
        this._exp = exp
        this._uid = uid
        uid++
        Target = this
        this._value = vm[exp]
        Target = null

    }

    update(){
        let value = this._vm[this._exp] 
        if (value !== this._value) {
            this._value = value
            this._cb.call(this.vm,value)
        }
    }
}

