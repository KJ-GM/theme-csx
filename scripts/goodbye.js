// theme-csx/scripts/goodbye.js

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;

console.log(`
${red('💥 theme-csx has been removed')}
${cyan('We’re sorry to see you go.')} If you have feedback or ran into issues, feel free to open an issue:

  ${green('🔗 https://github.com/KJ-GM/theme-csx/issues')}

${bold('Thanks for trying theme-csx!')} ✨
`);
