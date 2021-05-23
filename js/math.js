/**
 *  Get distance between 2 addresses objects
 * @param a - Address object with lat and lng
 * @param b - Address object with lat and lng
 * @return returns distance in kilometers
 */
function getDistance(a, b) {
    return Math.sqrt( Math.pow(a.lng - b.lng, 2) + Math.pow(a.lat - b.lat, 2)) * 111;
}
