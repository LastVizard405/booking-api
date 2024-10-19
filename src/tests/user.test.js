const app = require('../app');
const request = require('supertest');

let token;

const BASE_URL = '/api/v1/users';

// const user = {
// 	firstName: 'Ivan',
// 	lastName: 'Arteaga',
// 	email: 'ivan@yahoo.com.ar',
// 	password: 'ivan1234',
// 	gender: 'Male',
// };

test("POST -> 'BASE_URL', should responde status code 201, and res.body.email === user.email", async () => {
	const res = await request(app).post(BASE_URL).send(user);
	console.log(res.body);
	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBeDefined();
	expect(res.body.email).toBe(user.email);
});

test("POST -> 'BASE_URL/login', should return statusCode 200,  res.body.user and res.body.token to be defined", async () => {
	const res = await request(app).post(`${BASE_URL}/login`).send({
		email: 'ivan@yahoo.com.ar',
		password: 'ivan1234',
	});

	token = res.body.token;

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.user).toBeDefined();
	expect(res.body.token).toBeDefined();

	expect(res.body.user.email).toBe(user.email);
});

test("POST -> 'BASE_URL/login', should return statusCode 401", async () => {
	const res = await request(app).post(`${BASE_URL}/login`).send({
		email: 'email@false.com',
		password: 'ivan1234',
	});

	expect(res.status).toBe(401);
	expect(res.body).toBeDefined();
	expect(res.body.error).toBe('Error, invalid credentials');
});

test("Get -> 'BASE_URL', should return statusCode 200, and res.body.lentgth === 1", async () => {
	const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
});
test("Get -> 'BASE_URL', should return statusCode 200, and res.body.lentgth === 1", async () => {
	const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
});
test("Get -> 'BASE_URL', should return statusCode 200, and res.body.lentgth === 1", async () => {
	const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${token}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
});
