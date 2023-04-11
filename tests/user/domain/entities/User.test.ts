import User from "../../../../src/user/domain/entities/User";

describe("User", () => {
	test("given a User with a name passed by contructor, when its called to sayHello method, should return a greeting message", () => {
		const name = "Pepito";
		const user = new User(name);
		const expectedGreeting = "Hello, I am Pepito";

		const greeting = user.sayHello();

		expect(greeting).toBe(expectedGreeting);
	});
});
