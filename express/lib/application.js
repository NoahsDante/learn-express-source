const http = require('http');
const methods = require('methods')
const Router = require('./router');
class App {
    constructor() {
        this._router = new Router();
    }
    listen(...arg) {
        const server = http.createServer((req, res) => {
            this._router.handler(req,res)
        });
        server.listen(...arg);
    }
    use(patch, ...handlerArg) {
        this._router.use(patch, handlerArg);
    }
        

}
methods.forEach((method) => {
    App.prototype[method] = function (patch, ...handlerArg) {
        this._router[method](patch,handlerArg)
    }
});


module.exports = App;