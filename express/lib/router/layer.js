const pathRegexp = require('path-to-regexp');
class Layer {
    constructor(patch, handler) {
        this.patch = patch;
        this.handler = handler;
        this.keys = [];
        this.regexp = pathRegexp(patch, this.keys, {});
        this.params = {};
    }
    match(pathname) {
        const match = this.regexp.exec(pathname);
        if (match) {
            this.keys.forEach((val, index) => this.params[val.name] = match[index + 1]);
            return true;
        }
        if (this.isUseFn) {
            if (this.patch == '/') {
                return true;
            }
            if (pathname.startsWith(`${this.patch}/`)) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Layer;