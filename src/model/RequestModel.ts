import { t } from 'mobx-state-tree';

export const RequestModel = t
  .model('RequestModel', {
    count: t.number,
    next: t.maybeNull(t.string),
    previous: t.maybeNull(t.string),
  })
  .views((req) => ({
    get pageNum() {
      return Math.ceil(req.count / 20);
    },
  }));
