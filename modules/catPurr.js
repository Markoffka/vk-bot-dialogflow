const catsPurring = [
    'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
    'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
    'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
];

module.exports = {
    command: 'purr',
    exec: async(ctx) => {
        const link = catsPurring[Math.floor(Math.random() * catsPurring.length)];

        await Promise.all([
            ctx.send('Мур мур'),
            ctx.sendAudioMessage(link)
        ]);
    }
}