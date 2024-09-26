const { glob } = require('glob');
const path = require('path');
const fs = require('fs-extra');

module.exports = async options => {
  const { componentsPath, docReadmeName, split } = Object.assign(
    {
      componentsPath: 'src/components',
      docReadmeName: 'README.md',
      split: '---'
    },
    options
  );

  const fileList = await glob(`**/${docReadmeName}`, {
    cwd: path.resolve(process.cwd(), componentsPath)
  });

  const contentList = await Promise.all(fileList.map(filePath => fs.readFile(path.resolve(componentsPath, filePath), 'utf-8')));

  const content = contentList.join(`
${split}
`);

  const rootReadme = path.resolve(process.cwd(), 'README.md');

  if (await fs.exists(rootReadme)) {
    const currentContent = await fs.readFile(rootReadme, 'utf-8');
    const startSection = '<!--START_SECTION:DOC_MD-->',
      endSection = '<!--END_SECTION:DOC_MD-->';
    const startIndex = currentContent.indexOf(startSection) + startSection.length,
      endIndex = currentContent.indexOf(endSection);
    await fs.writeFile(rootReadme, currentContent.substring(0, startIndex) + content + currentContent.substring(endIndex));
  } else {
    await fs.writeFile(rootReadme, content);
  }
};
