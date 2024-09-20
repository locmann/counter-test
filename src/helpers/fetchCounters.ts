import { ResponseType } from '../types/types.ts';

export const fetchCounters = async (
  limit = 20,
  offset = 0
): Promise<ResponseType> => {
  const response = await fetch(
    `http://showroom.eis24.me/api/v4/test/meters/?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error('Could not fetch counters');
  }
  return await response.json();
};
