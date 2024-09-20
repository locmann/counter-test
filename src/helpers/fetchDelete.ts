export const fetchDelete = async (id: string) => {
  await fetch(`http://showroom.eis24.me/api/v4/test/meters/${id}`, {
    method: 'DELETE',
  });
};
