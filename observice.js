var Target = null

class Dep {
    constructor () {
        this.subs = []
    }

    add(watcher){
        let state = true
        for (const item of this.subs) {
            if (this.subs._uid === watcher._uid) {
                state = false
                break;
            }
        }
        if (state) {
            this.subs.push(watcher)
        }
    }

    notify(){
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

function observice (data) {
    if (typeof(data) !== 'object') {
        return false
    } else {
        Object.keys(data).forEach(key => {
            defineReactive(data,key,data[key])
        })
    }
}

function defineReactive(data,key,val) {
    observice(val)
    let dep = new Dep()
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: true,
        get() {
            Target && dep.add(Target)
            return val
        },
        set(newval) {
            val = newval
            dep.notify()
        }
    })
}