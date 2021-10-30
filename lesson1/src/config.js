const APP_PORT = process.env.APP_PORT || 3030;
const args = process.argv.slice(2);
let ENV;

for (let i = 0; i < args.length; i++) {
  if (args[i].slice(2).toLowerCase() === 'env') {
    ENV = args[i + 1];
    break;
  }
}

module.exports = {
  ENV,
  APP_PORT,
};
