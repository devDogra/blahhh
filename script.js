const friends = require('./friends.json'); 

const gyanDhanOfficeCoordinates = {
    latitude: 28.521134,
    longitude: 77.206567
}

const closeFriends = getFriendsWithinDistance(friends, 100)
sortFriendsById(closeFriends);
console.table(closeFriends); 

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateDistanceFromOffice(latitude, longitude) {
    // pt 1 -> office
    const lat1 = degreesToRadians(gyanDhanOfficeCoordinates.latitude);
    const long1 = degreesToRadians(gyanDhanOfficeCoordinates.longitude);

    // pt 2 -> friend
    const lat2 = degreesToRadians(latitude);
    const long2 = degreesToRadians(longitude); 

    const EARTH_RADIUS_KMS = 6371;

    const centralAngle = Math.acos((Math.sin(lat1) * Math.sin(lat2)) + 
    (Math.cos(lat1) * Math.cos(lat2) * Math.cos(Math.abs(long1 - long2))))

    const distanceFromOfficeInKms = EARTH_RADIUS_KMS * centralAngle;
    return distanceFromOfficeInKms; 
}

function getFriendsWithinDistance(friends, distance) {
    return friends.filter(f => calculateDistanceFromOffice(f.latitude, f.longitude) <= distance)
}

function sortFriendsById(friends) {
    friends.sort((a, b) => a.id < b.id ? -1 : +1)
}








