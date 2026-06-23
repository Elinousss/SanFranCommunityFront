export const ReservationCreateDto = ({ userId, facilityId, date, startTime, endTime, status }) => ({
  userId,
  facilityId,
  date,
  startTime,
  endTime,
  status: typeof status === 'string' ? status.trim() : 'PENDING',
});
