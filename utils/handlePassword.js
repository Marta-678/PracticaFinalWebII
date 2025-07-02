const bcryptjs = require("bcryptjs");

// genera un hash seguro
const encrypt = async (clearPassword) => {
    const hash = await bcryptjs.hash(clearPassword, 10);
    return hash;
};

// comprueba que la contraseña coincide con el hash
const compare = async (clearPassword, hashedPassword) => {
    return await bcryptjs.compare(clearPassword, hashedPassword);
};
  
module.exports = { encrypt, compare };