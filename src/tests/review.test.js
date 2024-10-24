const request = require('supertest');
const app = require('../app');

let reviewId, token, userId;

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

const BASE_URL = '/api/v1/reviews';

const review = {
	rating: '4.3',
	comment: 'Excelent!',
};

const reviewUpdate = {
	rating: '4.1',
	comment: 'Nice Service',
};

test("POST-> 'BASE_URL' should return status code 201 and res.body.rating has to be review.rating", async () => {
	const res = await request(app).post(BASE_URL).send(review).set('Authorization', `Bearer ${token}`);

	reviewId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.rating).toBe(review.rating);
});
test("GET-> 'BASE_URL' should return status code 200 and res.body has to have length === 1", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
	expect(res.body[0].hotelId).toBeDefined();
});
test("GET-> 'BASE_URL/:id' should return status code 200 and res.body.rating has to be review.rating", async () => {
	const res = await request(app).get(`${BASE_URL}/${reviewId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.rating).toBe(review.rating);
	expect(res.body.hotelId).toBeDefined();

	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(reviewId);
});
test("PUT-> 'BASE_URL/:id' should return status code 200 and res.body.rating has to be reviewUpdate.rating", async () => {
	const res = await request(app).put(`${BASE_URL}/${reviewId}`).send(reviewUpdate).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(reviewId);
	expect(res.body.rating).toBe(reviewUpdate.rating);
});
test("DELETE-> 'BASE_URL/:id' should return status code 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${reviewId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(204);
});
