import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
export class Controller {
    constructor() {
        this.router = Router();
    }
    routes() {
        if (this.index) {
            this.router.get(`/`, asyncHandler(this.index));
        }
        if (this.show) {
            this.router.get(`/:id`, asyncHandler(this.show));
        }
        if (this.store) {
            this.router.post(`/`, asyncHandler(this.store));
        }
        if (this.delete) {
            this.router.delete(`/:id`, asyncHandler(this.delete));
        }
        if (this.update) {
            this.router.put(`/:id`, asyncHandler(this.update));
        }
        return this.router;
    }
}
//# sourceMappingURL=index.js.map