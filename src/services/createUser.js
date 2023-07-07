const db = require("../db/client/db");

const createUser = async ({
  email,
  password,
  name,
  birthday_date,
  phone_number,
}) => {
  try {
    const userId = await db
      .insert({
        email,
        password,
        name,
        birthday_date,
        phone_number,
        created_at: db.raw("NOW()"),
        updated_at: db.raw("NOW()"),
      })
      .into("users")
      .returning("id");

    return userId;
  } catch (error) {
    throw error;
  }
};

module.exports = createUser;
