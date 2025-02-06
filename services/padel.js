import instance from './api.js';

const clubId = '9ca8aec4-6d34-4f5e-9e32-7b403ebee41a';
const startTime = '18:30:00';
const endTime = '22:29:00';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzUzOTE3OTEsImV4cCI6MTczODA3MDE5MSwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9DTElFTlQiXSwidXNlcm5hbWUiOiJjaHJpc2JvczM4IiwiaWQiOiIxZTFkMmFiOC04NDFkLTRmYjMtYmMzNi1hOTY5NjI4ODEyNWUiLCJmaXJzdE5hbWUiOiJDaHJpc3RpYW4iLCJsYXN0TmFtZSI6IkJvc2NoIn0.VNF6umnSd8xyS_QJHpkXB4IBESItshcWoQ-sXFIA1w4lnpJHGlTHCANNYOFrsyBGVGw7YeJER0EY-qNaW6sGpqoCnqJZYefhgHLDERU4WYdayDIU_bAiWGglJei6tPN9diTQuQp3WI26CIJAvNrHPgXT8gti9Svtzx9aXSiMeItRiJzKfJcocbRhAjMUoEViw_1OjizAbtCKQhrg4dHnNce-91KunYXbqd9iTsw-ARkd3gLX6qN3YWoS_aQxrfIWzm5aa_YfqcNizugfc2f7Nxih-7rQqmC7ovngLe1kZHsEyUmx7TLoOxqxCjiwggm9AP5dZU4pvNSSSRwPF0USdNBE3hb9Wr3M4HZWgfto2nPNlJT0ISQ15acZYHDtfErOE15S9a2FQD1pq9GwCAHXsLWFEh_7KY_IySkOFo3rPSSmv_M9GzvhJ4LY5emu2xPjeYTB8jugTwYsUPoSTs709FoaaE4x4m8lmAMolGQcRiEUJ1d87kA8fyuQu1zNrHmBXKBVNsLZxXz79O1ygeBg5VgfMrIctg9GzYbAWOwnW_A50HJhYu_IfuZjD9K1X3PUP7sG4RoQIrpmcYzHN50-KNPEaU8-5XwID1c4WW73ZB5Wkw4sRPn2LMtHmDtOB5N7uP2zSQPMKrb9sQOx2uX_jwJz_LEtII0d8YB2hsg0eoY';
export default {

  getResas(sdate, stime, etime) {

    if (!stime) {
      stime = startTime;
    }
    if (!etime) {
      etime = endTime;
    }
    const rqt = `/playgrounds/plannings/${sdate}?club.id=${clubId}&from=${stime}&to=${etime}&bookingType=unique`;
    // return Api().get('/2025-01-20?club.id=9ca8aec4-6d34-4f5e-9e32-7b403ebee41a&from=18:30:00&to=22:29:00&bookingType=unique');
    return instance.get(rqt);
  },

  getCours(sdate) {
    let rqt = `/bookings?activityType=event&startAt[after]=${sdate}T00:00:00`
    //rqt += `&order[startAt]=asc&club.id=9ca8aec4-6d34-4f5e-9e32-7b403ebee41a&itemsPerPage=50&timetableBlockPrice.category.id=a52c7418-886e-4f72-91dc-ebe0c9b01738`;
    rqt += `&order[startAt]=asc&club.id=9ca8aec4-6d34-4f5e-9e32-7b403ebee41a&itemsPerPage=50&timetableBlockPrice.category.id=a52c7418-886e-4f72-91dc-ebe0c9b01738`;
    return instance.get(rqt);
  },
  getParticipants(id) {
    //Api().defaults.headers['Authorization'] = `BEARER ${token}`;
    return instance.get(`/bookings/participants?booking.id=/clubs/bookings/${id}&canceled=false&itemsPerPage=120`);
  },
  getBooking(id) {
    // Api().defaults.headers['Authorization'] = `BEARER ${token}`;
    return instance.get(`/bookings/${id}`);
  }

}