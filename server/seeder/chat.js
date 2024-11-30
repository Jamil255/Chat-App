import { faker, simpleFaker } from "@faker-js/faker";
import userModel from "../models/userSchema.js";
import chatModel from "../models/chatSchema.js";
import messageModel from "../models/messageSchema.js";

const createSingleChats = async (numChats) => {
  try {
    const users = await userModel.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          chatModel.create({
            name: faker.lorem.words(2),
            members: [users[i]._id, users[j]._id], // Ensure only `_id` is passed
          })
        );
      }
    }

    await Promise.all(chatsPromise);

    console.log("Single chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await userModel.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex]._id; // Extract `_id`

        // Ensure the same user is not added twice
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }

      const chat = chatModel.create({
        groupChat: true,
        name: faker.lorem.words(2),
        members,
        creator: members[0], // Set the first member as the creator
      });

      chatsPromise.push(chat);
    }

    await Promise.all(chatsPromise);

    console.log("Group chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await userModel.find().select("_id");
    const chats = await chatModel.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]._id;
      const randomChat = chats[Math.floor(Math.random() * chats.length)]._id;

      messagesPromise.push(
        messageModel.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);

    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessagesInAChat = async (chatId, numMessages) => {
  try {
    const users = await userModel.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]._id;

      messagesPromise.push(
        messageModel.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);

    console.log("Messages in chat created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createGroupChats,
  createMessages,
  createMessagesInAChat,
  createSingleChats,
};
