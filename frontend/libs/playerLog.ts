
const playerLog = (player) => {
    player.on('error', (error) => {
        console.log('Video.js error:', error);
      });
}
export default playerLog