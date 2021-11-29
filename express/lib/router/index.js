const url = require('url');
const methods = require('methods');
const Layer = require('./layer');
const Route = require('./route');
class Router {
    constructor() {
        this.routers = [];
    }
    handler(req, res) {
        const { pathname } = url.parse(req.url);
        let routerIndex = 0;
        const next = () => {
            if (routerIndex >= this.routers.length) {
                console.log('找不到patchname');
                return res.end('找不到patchname');
            }
            const layer = this.routers[routerIndex++];
            const match = layer.match(pathname);
            if (match) {
                req.params = req.params || {};
                Object.assign(req.params, layer.params);
            }
            if (match) {
                layer.handler(req, res, next)
            } else {
                next();
            }
        }
        next();
    }
    use(patch, handlerArg) {
        if (typeof patch == 'function') {
            handlerArg.unshift(patch);
            patch = '/';
        }
        handlerArg.forEach((handler) => {
            const layer = new Layer(patch, handler);
            layer.isUseFn = true;
            this.routers.push(layer);
        });

    }
}
methods.forEach((method) => {
    Router.prototype[method] = function (patch, handlerArg) {
        const route = new Route();
        const layer = new Layer(patch, route.dispatch.bind(route));
        layer.method = method;
        this.routers.push(layer);
        route[method](patch, handlerArg);

    }
});


module.exports = Router;