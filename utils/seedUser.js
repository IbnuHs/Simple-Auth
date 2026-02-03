const { getAlluser, createUser } = require("../query/user.query");
const bcrypt = require("bcrypt");

async function seedUser() {
  try {
    const userexist = await getAlluser();
    if (userexist) {
      console.log("User Sudah Ada");
      return;
    }
    const id = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(process.env.PASSWORD, salt);
    await createUser(id, process.env.EMAIL, hashpassword);
    console.log("User Berhasil Dibuat");
  } catch (error) {
    console.log(error);
  }
}

module.exports = seedUser;
