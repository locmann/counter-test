import { t } from 'mobx-state-tree';

export const CounterModel = t.model('CounterModel', {
  id: t.string,
  _type: t.array(t.string),
  area: t.model('area', {
    id: t.string,
  }),
  is_automatic: t.maybeNull(t.boolean),
  communication: t.string,
  serial_number: t.string,
  installation_date: t.string,
  initial_values: t.array(t.number),
  description: t.maybeNull(t.string),
  brand_name: t.maybeNull(t.string),
  model_name: t.maybeNull(t.string),
});
