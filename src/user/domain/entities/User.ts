class User {
	private readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	sayHello(): string {
		return `Hello, I am ${this.name}`;
	}

	toPrimitive(): { name: string } {
		return { name: this.name };
	}
}

export default User;
