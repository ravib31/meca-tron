import mongoose, { Connection } from "mongoose";

// Extend the NodeJS global interface to include mongoose connection properties
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
      };
    }
  }
}

// Initialize a global object to hold the mongoose connection and promise
const globalWithMongoose = global as typeof global & {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

globalWithMongoose.mongoose = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

/**
 * Establish a connection to the MongoDB database using mongoose.
 * If a connection already exists, return the existing connection.
 * Otherwise, create a new connection and store it in the global object.
 *
 * @returns {Promise<mongoose.Connection>} - Returns a promise that resolves to the mongoose connection.
 */
async function dbConnect(): Promise<Connection> {
  // Check if there is already an existing mongoose connection
  if (globalWithMongoose.mongoose.conn) {
    console.log("Reusing existing database connection");
    return globalWithMongoose.mongoose.conn;
  }

  // Create a new mongoose connection promise if none exists
  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose
      .connect(
        "mongodb+srv://mecatron:mecatron@mecatron.sfkhyyu.mongodb.net/mecatron"
      )
      .then((mongoose) => mongoose.connection);
  }

  // Wait for the promise to resolve and store the connection
  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;

  console.log("New database connection established");
  return globalWithMongoose.mongoose.conn;
}

export default dbConnect;
