let fromScript = true;
let vueMethod = document.querySelector("#topBar").__vue__;

const oldPost = Worker.prototype.postMessage;
Worker.prototype.postMessage = async function (...args) {
    let that = this
    async function hookPost(){
        if (args[0].period) {
            args[0].period = args[0].period / 100 // 加速倍速
        }
        oldPost.apply(that, args)
    }
    let hookResult = await hookPost()
    if (fromScript) {
        vueMethod.pause()
        fromScript = false
    }
    return hookResult
}
setTimeout(()=>{vueMethod.pause()},5000);