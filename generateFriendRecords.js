const { faker } = require('@faker-js/faker');
const fs = require('fs'); 

function createRandomUser() {
    return {
        name: faker.person.fullName(),
        latitude: faker.location.latitude({ max: 32, min: 25 }),
        longitude: faker.location.longitude({ max: 82, min: 72 }),
    };
}

function createFriendsData() {
    let id = 0;
    const friends = faker.helpers.multiple(createRandomUser, {count: 50});
    friends.forEach(f => f.id = id++)
    
    fs.unlinkSync("./friends.json"); 
    fs.writeFileSync("./friends.json", JSON.stringify(friends)); 
}

createFriendsData(); 
