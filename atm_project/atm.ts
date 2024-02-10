import * as readline from 'readline';

// Define the User interface
interface User {
  userId: string;
  pin: string;
  balance: number;
}

// Function to generate random user data
function generateUserData(): User {
  const userId = Math.random().toString(36).substr(2, 9); // Random user ID
  const pin = Math.random().toString(36).substr(2, 4); // Random PIN
  const balance = Math.floor(Math.random() * 10000); // Random balance
  return { userId, pin, balance };
}

// Generate sample user data
const usersData: Map<string, User> = new Map();
for (let i = 0; i < 10; i++) {
  const userData = generateUserData();
  usersData.set(userData.userId, userData);
}
// Print out the generated user IDs and their corresponding PINs
console.log('Generated User Data:');
usersData.forEach((userData, userId) => {
  console.log(`User ID: ${userId}, PIN: ${userData.pin}`);
});

// Function to authenticate user
function authenticateUser(userId: string, pin: string): boolean {
  const user = usersData.get(userId);
  return !!user && user.pin === pin;
}

// Function to show ATM options
function showATMOptions() {
  console.log('Welcome to the ATM!');
  console.log('1. Check Balance');
  console.log('2. Exit');
}

// Function to handle ATM operations
function handleATM(userId: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  showATMOptions();

  rl.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        console.log(`Your balance is $${usersData.get(userId)?.balance}`);
        rl.close();
        break;
      case '2':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        rl.close();
        break;
    }
  });
}

// Main function
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter your User ID: ', (userId) => {
    if (usersData.has(userId)) {
      rl.question('Enter your PIN: ', (pin) => {
        if (authenticateUser(userId, pin)) {
          handleATM(userId);
        } else {
          console.log('Invalid PIN!');
          rl.close();
        }
      });
    } else {
      console.log('Invalid User ID!');
      rl.close();
    }
  });
}

// Start the application
main();
