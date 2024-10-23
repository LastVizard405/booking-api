const request = require('supertest');
const app = require('../app');

let cityId, token, userId;

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

const BASE_URL = '/api/v1/cities';

const city = {
	name: 'Tokyo',
	country: 'Japan',
	countryId: 'JP',
};

const cityUpdate = {
	name: 'Paris',
	country: 'France',
	countryId: 'FR',
};

test("POST-> 'BASE_URL' should return status code 201 and res.body.name has to be city.name", async () => {
	const res = await request(app).post(BASE_URL).send(city).set('Authorization', `Bearer ${token}`);

	cityId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(city.name);
});
test("GET-> 'BASE_URL' should return status code 200 and res.body has to have length === 1", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
});
test("GET-> 'BASE_URL/:id' should return status code 200 and res.body.name has to be city.name", async () => {
	const res = await request(app).get(`${BASE_URL}/${cityId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(city.name);

	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(cityId);
});
test("PUT-> 'BASE_URL/:id' should return status code 200 and res.body.name has to be cityUpdate.name", async () => {
	const res = await request(app).put(`${BASE_URL}/${cityId}`).send(cityUpdate).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(cityId);
	expect(res.body.name).toBe(cityUpdate.name);
});
test("DELETE-> 'BASE_URL/:id' should return status code 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${cityId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(204);
});
