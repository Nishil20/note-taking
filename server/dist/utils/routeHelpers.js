"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
/**
 * Wraps controller functions to handle TypeScript return type issues with Express.
 * Express expects route handlers to either return void or Promise<void>,
 * but our controllers return Response objects.
 *
 * @param fn The controller function to wrap
 * @returns A properly typed RequestHandler function
 */
const wrapAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.wrapAsync = wrapAsync;
//# sourceMappingURL=routeHelpers.js.map