const { dbConnect, client } = require("../db-mongo");

const jwt = require("jsonwebtoken");

async function getUserStudent(userid) {
  await dbConnect();
  try {
    const db = client.db("User");
    console.log("db" + userid);

    const user = await db
      .collection("Students")
      .find({ userid: `${userid}` })
      .toArray();
    return user;
  } catch (err) {
    console.error(err);
  }
}
async function getUserTeacher(userid) {
  await dbConnect();
  try {
    const db = client.db("User");
    console.log("db" + userid);

    const user = await db
      .collection("Teachers")
      .find({ userid: `${userid}` })
      .toArray();
    return user;
  } catch (err) {
    console.error(err);
  }
}

async function generateToken(tokenData, secretKey, jwt_expiry) {
  return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expiry });
}

module.exports = { getUserStudent, getUserTeacher, generateToken };
