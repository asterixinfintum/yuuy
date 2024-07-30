function generateDeterministicRandomString(length = 10, seed = 42) {
    function seedRandom(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        seed = seedRandom(seed);
        const randomIndex = Math.floor(seed * characters.length);
        randomString += characters[randomIndex];
        seed++;
    }

    return randomString;
}

module.exports =  generateDeterministicRandomString;