const request = require('supertest');
const app = require('../app');

let imageId;

const BASE_URL = '/api/v1/images';

const image = {
	url: 'https://hotels-api.academlo.tech/uploads/2839875.jpg',
};

const imageUpdate = {
	url: 'https://hotels-api.academlo.tech/uploads/79218818.jpg',
};

test("POST-> 'BASE_URL' should return status code 201 and res.body.url has to be image.url", async () => {
	const res = await request(app).post(BASE_URL).send(image);

	imageId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.url).toBe(image.url);
});
test("GET-> 'BASE_URL' should return status code 200 and res.body has to have length === 1", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body[0].hotelId).toBeDefined();
	expect(res.body).toHaveLength(1);
});
test("GET-> 'BASE_URL/:id' should return status code 200 and res.body.url has to be image.url", async () => {
	const res = await request(app).get(`${BASE_URL}/${imageId}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.url).toBe(image.url);

	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(imageId);

	expect(res.body.hotelId).toBeDefined();
});
test("PUT-> 'BASE_URL/:id' should return status code 200 and res.body.url has to be imageUpdate.url", async () => {
	const res = await request(app).put(`${BASE_URL}/${imageId}`).send(imageUpdate);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.id).toBe(imageId);
	expect(res.body.url).toBe(imageUpdate.url);
});
test("DELETE-> 'BASE_URL/:id' should return status code 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${imageId}`);

	expect(res.status).toBe(204);
});
