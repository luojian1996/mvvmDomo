class Compile {
    constructor (el,vm) {
        this._el = el
        this._vm = vm
        this._compileElement(el)
    }
    _compileElement(el) {
        let childs = el.childNodes
        Array.from(childs).forEach(node => {
            if (node.childNodes && node.childNodes.length>0) {
                this._compileElement(node)
            } else {
                this._compile(node)
            }
        })
    }
    _compile(node) {
        if (node.nodeType === 3) {
            let reg = /\{\{(.*)\}\}/
            let text = node.textContent
            if (reg.test(text)) {
                // {{}}的时候
                let key = RegExp.$1
                node.textContent = this._vm[key]
                new Watcher(this._vm,key,val=>{
                    node.textContent = val
                })
            }
        } else if (node.nodeType === 1) {
            let nodeArr = node.attributes
            Array.from(nodeArr).forEach(attr => {
                if (attr.nodeName  === 'v-model') {
                    // v-model的时候
                    node.value = this._vm[attr.nodeValue]
                    node.addEventListener('input',()=>{
                        this._vm[attr.nodeValue] = node.value
                    })
                    new Watcher(this._vm,attr.nodeValue,val=> {
                        node.value =val
                    })
                }
            })
        }
    }
}