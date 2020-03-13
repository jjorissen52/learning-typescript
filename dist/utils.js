"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=utils.js.map