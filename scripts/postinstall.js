// theme-csx/scripts/postinstall.js

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;

console.log(`
${green('🎨  Thanks for installing')} ${bold('theme-csx')}!
${cyan('📚  Docs:')} https://github.com/KJ-GM/theme-csx
${yellow('⭐  Star us on GitHub if you like it!')} https://github.com/KJ-GM/theme-csx
`);
