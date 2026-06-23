export const FacilityCreateDto = ({ name, description, capacity, imageUrl }) => ({
  name: typeof name === 'string' ? name.trim() : '',
  description: typeof description === 'string' ? description.trim() : '',
  capacity: Number(capacity) || 0,
  imageUrl: typeof imageUrl === 'string' ? imageUrl.trim() : '',
});
