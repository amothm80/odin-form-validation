// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {
      0: {
        id: 0,
        firstName: "ahmed",
        lastName: "ali",
        email: "ahmal@gmail.com",
      },
      1: {
        id: 1,
        firstName: "ahmar",
        lastName: "ali",
        email: "ahmal2@gmail.com",
      },
      2: {
        id: 2,
        firstName: "ali",
        lastName: "ahmed",
        email: "aliahm@gmail.com",
      },
    };
    this.id = 2;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  searchUser(query) {
    console.log(`query is ${query}`);
    let results = [];
    for (let item in this.storage) {
      // console.log()
      // // console.log(item.firstName.match(query))
      if(this.storage[item].firstName.match(query)||this.storage[item].lastName.match(query)||this.storage[item].email.match(query)){
        results.push(this.storage[item])
      }
      
    }
    return results
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
