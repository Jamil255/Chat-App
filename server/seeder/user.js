import { faker } from "@faker-js/faker";
import userModel from "../models/userSchema.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = userModel.create({
        name: faker.person.fullName(),
        userName: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          publicId: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);

    console.log("Users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { createUser };