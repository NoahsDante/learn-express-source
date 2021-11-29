const methods = require('methods');
const Layer = require('./layer')
class Route {
    constructor() {
        this.stack = [];
        this.index = 0;
    }

    dispatch(req, res, out) {
        let routerIndex = 0;
        const method = req.method.toLowerCase();
        const nexts = () => {
            const layer = this.stack[routerIndex++];
            if (routerIndex > this.stack.length) {
                return out();
            }
            if (method == layer.method) {
                return layer.handler(req, res, nexts)
            }
            nexts();
        };
        nexts();
    }
};
methods.forEach((method) => {
    Route.prototype[method] = function (patch, handlers) {
        handlers.forEach((handler) => {
            const layer = new Layer(patch, handler);
            layer.method = method;
            this.stack.push(layer);
        });

    }
});
module.exports = Route;