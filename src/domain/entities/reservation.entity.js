export class ReservationEntity {
  constructor({ id, userId, facilityId, reservationDate, date, startTime, endTime, status }) {
    this.id = id;
    this.userId = userId;
    this.facilityId = facilityId;
    // Backwards-compatible property
    this.reservationDate = reservationDate || date || null;
    this.date = date || reservationDate || null;
    this.startTime = startTime || null;
    this.endTime = endTime || null;
    this.status = status;
  }
}
