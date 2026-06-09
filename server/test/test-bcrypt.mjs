import bcrypt from "bcryptjs"; // or "bcrypt"

const runTest = async () => {
  const password = "mypassword123";

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log("Hash:", hash);

  // Compare correct password
  const isMatch1 = await bcrypt.compare("mypassword123", hash);
  console.log("Correct password match:", isMatch1); // should be true 

  // Compare wrong password
  const isMatch2 = await bcrypt.compare("wrongpassword", hash);
  console.log("Wrong password match:", isMatch2); // should be false 
};

runTest();
