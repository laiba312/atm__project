"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Function to generate random user data
function generateUserData() {
    const userId = Math.random().toString(36).substr(2, 9); // Random user ID
    const pin = Math.random().toString(36).substr(2, 4); // Random PIN
    const balance = Math.floor(Math.random() * 10000); // Random balance
    return { userId, pin, balance };
}
// Generate sample user data
const usersData = new Map();
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
function authenticateUser(userId, pin) {
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
function handleATM(userId) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    showATMOptions();
    rl.question('Select an option: ', (option) => {
        var _a;
        switch (option) {
            case '1':
                console.log(`Your balance is $${(_a = usersData.get(userId)) === null || _a === void 0 ? void 0 : _a.balance}`);
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
                }
                else {
                    console.log('Invalid PIN!');
                    rl.close();
                }
            });
        }
        else {
            console.log('Invalid User ID!');
            rl.close();
        }
    });
}
// Start the application
main();
