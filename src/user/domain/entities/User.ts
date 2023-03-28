class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return `Hello, I am ${this.name}`;
  }

  toPrimitive() {
    return { name: this.name };
  }
}

export default User;
