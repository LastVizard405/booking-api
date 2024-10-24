const request = require('supertest');
const app = require('../app');

let bookingId, token, userId;

beforeAll(async () => {
	const user = {
		firstName: 'Ivan',
		lastName: 'Arteaga',
		email: 'ivan@yahoo.com.ar',
		password: 'ivan1234',
		gender: 'Male',
	};

	const userRes = await request(app).post('/api/v1/users').send(user);

	userId = userRes.body.id;

	const loginRes = await request(app).post('/api/v1/users/login').send({
		email: 'ivan@yahoo.com.ar',
		password: 'ivan1234',
	});

	token = loginRes.body.token;
});

afterAll(async () => {
	await request(app).delete(`/api/v1/users/${userId}`);
});

const BASE_URL = '/api/v1/bookings';

const booking = {
	checkIn: '2024-11-10',
	checkOut: '2024-11-17',
};

const bookingUpdate = {
	checkOut: '2024-11-19',
};

test("POST-> 'BASE_URL' should return status code 201 and res.body.checkIn has to be booking.checkIn", async () => {
	const res = await request(app).post(BASE_URL).send(booking).set('Authorization', `Bearer ${token}`);

	bookingId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.checkIn).toBe(booking.checkIn);
});
test("GET-> 'BASE_URL' should return status code 200 and res.body has to have length === 1", async () => {
	const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body[0].hotelId).toBeDefined();
	expect(res.body).toHaveLength(1);
});
test("GET-> 'BASE_URL/:id' should return status code 200 and res.body.checkIn has to be booking.checkIn", async () => {
	const res = await request(app).get(`${BASE_URL}/${bookingId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.checkIn).toBe(booking.checkIn);
	expect(res.body.hotelId).toBeDefined();

	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(bookingId);
});
test("PUT-> 'BASE_URL/:id' should return status code 200 and res.body.checkOut has to be bookingUpdate.checkOut", async () => {
	const res = await request(app).put(`${BASE_URL}/${bookingId}`).send(bookingUpdate).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(bookingId);
	expect(res.body.checkOut).toBe(bookingUpdate.checkOut);
});
test("DELETE-> 'BASE_URL/:id' should return status code 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${bookingId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(204);
});
