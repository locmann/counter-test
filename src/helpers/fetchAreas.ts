export const fetchAreas = async (ids: string[]) => {
  const res = await Promise.all(ids.map((id) => fetchOneArea(id)));

  return res.map((area) => ({ ...area.results[0] }));
  /*const response = await fetch(
    `http://showroom.eis24.me/api/v4/test/areas/?id__in=${id__in}`
  );
  if (!response.ok) {
    throw new Error('Could not fetch counters');
  }
  return await response.json();*/
};

const fetchOneArea = async (id__in: string) => {
  const response = await fetch(
    `http://showroom.eis24.me/api/v4/test/areas/?id__in=${id__in}`
  );
  if (!response.ok) {
    throw new Error('Could not fetch counters');
  }
  return await response.json();
};
