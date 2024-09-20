import { Instance, t } from 'mobx-state-tree';

export const RequestModel = t
  .model('RequestModel', {
    count: t.number,
    next: t.maybeNull(t.string),
    previous: t.maybeNull(t.string),
    currentPage: t.number,
  })
  .views((req) => ({
    get pageNum() {
      return Math.ceil(req.count / 20);
    },
    get currentPageNum() {
      return req.currentPage;
    },
  }));

export type RequestModelType = Instance<typeof RequestModel>;
