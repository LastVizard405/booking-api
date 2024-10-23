const request = require('supertest');
const app = require('../app');

let hotelId, token, userId;

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

const BASE_URL = '/api/v1/hotels';

const hotel = {
	name: 'Hôtel Le Royal Monceau Raffles Paris',
	description: 'Hôtel Le Royal Monceau - Raffles Paris is a 5-star luxury hotel refurbished by the world-renowned designer Philippe Starck.',
	price: '743',
	address: '37 Avenue Hoche, 8th arr., 75008 Paris, France',
	lat: '48.875838090473664',
	lon: '2.300348641089383',
	rating: '4.24',
};

const hotelUpdate = {
	price: '910',
};

test("POST-> 'BASE_URL' should return status code 201 and res.body.name has to be hotel.name", async () => {
	const res = await request(app).post(BASE_URL).send(hotel).set('Authorization', `Bearer ${token}`);
	hotelId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(hotel.name);
});
test("GET-> 'BASE_URL' should return status code 200 and res.body has to have length === 1", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);

	expect(res.body[0].city).toBeDefined();

	expect(res.body[0].images).toBeDefined();
	expect(res.body[0].images).toHaveLength(0);
});
test("GET-> 'BASE_URL/:id' should return status code 200 and res.body.name has to be hotel.name", async () => {
	const res = await request(app).get(`${BASE_URL}/${hotelId}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(hotel.name);

	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(hotelId);

	expect(res.body.city).toBeDefined();

	expect(res.body.images).toBeDefined();
	expect(res.body.images).toHaveLength(0);
});
test("PUT-> 'BASE_URL/:id' should return status code 200 and res.body.price has to be hotelUpdate.price", async () => {
	const res = await request(app).put(`${BASE_URL}/${hotelId}`).send(hotelUpdate).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(hotelId);
	expect(res.body.price).toBe(hotelUpdate.price);
});
test("DELETE-> 'BASE_URL/:id' should return status code 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${hotelId}`).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(204);
});
