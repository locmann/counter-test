export const fetchCounters = async (limit = 20, offset = 0) => {
  const response = await fetch(
    `http://showroom.eis24.me/api/v4/test/meters/?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error('Could not fetch counters');
  }
  return await response.json();
};
