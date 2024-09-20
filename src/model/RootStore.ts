import { flow, Instance, t } from 'mobx-state-tree';
import { CounterModel } from './CounterModel.ts';
import { fetchCounters } from '../helpers/fetchCounters.ts';
import { RequestModel, RequestModelType } from './RequestModel.ts';
import { fetchAreas } from '../helpers/fetchAreas.ts';
import { fetchDelete } from '../helpers/fetchDelete.ts';

export const RootStore = t
  .model('RootStore', {
    counters: t.array(CounterModel),
    areasCache: t.map(t.string),
    request: t.optional(RequestModel, {
      count: 0,
      next: null,
      previous: null,
      currentPage: 1,
    }),
  })

  .actions((store) => ({
    deleteCounter: flow(function* deleteCounter(index: number, id: string) {
      try {
        yield fetchDelete(id);
        store.counters.splice(index, 1);
      } catch (e: unknown) {
        throw new Error((e as Error).message);
      }
    }),
    getCounterAddress(id: string) {
      return store.areasCache.get(id);
    },
    changePage: flow(function* changePage(toPage: number) {
      try {
        store.counters.clear();
        const data = yield fetchCounters(20, (toPage - 1) * 20);

        store.request = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          currentPage: toPage,
        } as RequestModelType;

        store.counters = data.results;

        const areaIds = [
          ...new Set(
            data.results.map(
              (counter: { area: { id: string } }) => counter.area.id
            )
          ),
        ];

        const unknownAreaIds = areaIds.filter(
          (id) => !store.areasCache.has(id as string)
        );

        if (unknownAreaIds.length > 0) {
          const areas = yield fetchAreas(unknownAreaIds as string[]);
          areas.forEach((area: { id: string; house: { address: string } }) => {
            store.areasCache.set(area.id, area.house.address);
          });
        }
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
