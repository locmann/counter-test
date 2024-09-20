import { flow, Instance, t } from 'mobx-state-tree';
import { CounterModel } from './CounterModel.ts';
import { fetchCounters } from '../helpers/fetchCounters.ts';
import { RequestModel } from './RequestModel.ts';

export const RootStore = t
  .model('RootStore', {
    counters: t.array(CounterModel),
    request: t.optional(RequestModel, { count: 0, next: null, previous: null }),
  })
  .actions((store) => ({
    addCounter: flow(function* fetchData() {
      try {
        const data = yield fetchCounters();

        store.request = {
          count: data.count,
          next: data.next,
          previous: data.previous,
        };
        console.log(store.request);
        store.counters.push(...data.results);
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }),
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;

export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create();
  }
  return rootStore;
}
