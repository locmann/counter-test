import { CounterModelType } from '../model/CounterModel.ts';

export type ResponseType = {
  next: null | string;
  previous: null | string;
  count: number;
  results: CounterModelType[];
};
