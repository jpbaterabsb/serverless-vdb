import { Router } from 'express';
import { Action, handler } from '@utils/handler.util';

export default abstract class Controller {
  index: Action | undefined;

  show: Action | undefined;

  store: Action | undefined;

  update: Action | undefined;

  delete: Action | undefined;

  router: Router = Router();

  routes() {
    if (this.index) {
      this.router.get('/', handler(this.index));
    }
    if (this.show) {
      this.router.get('/:id', handler(this.show));
    }
    if (this.store) {
      this.router.post('/', handler(this.store));
    }
    if (this.delete) {
      this.router.delete('/:id', handler(this.delete));
    }
    if (this.update) {
      this.router.put('/:id', handler(this.update));
    }
    return this.router;
  }
}
