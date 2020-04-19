import inquirer from "inquirer";
import fs from "fs";

const TARGET_DIR = `${process.cwd()}`;
const CHOICES = fs.readdirSync(`${process.cwd()}/templates`);

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate(input: string) {
      if (/^([A-Za-z.\-_\d])+$/.test(input)) return true;
      return "Project name may only include letters, numbers, underscores, periods, and hashes.";
    },
  }
];

function createDirectoryContents(templatePath: string, newProjectPath: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    // Omit template json
    if (stats.isFile() && file !== 'template.json') {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

class TemplateConfig {
  constructor(public handlerName: string) { }
}

export class Prompt {
  constructor() {}

  public inquire() {
    inquirer.prompt(QUESTIONS).then(async (answers: Record<string, any>) => {
      const projectChoice = answers["project-choice"];
      const projectName = answers["project-name"];
      const templatePath = `${process.cwd()}/templates/${projectChoice}`;
      const targetPath = `${TARGET_DIR}/${projectName}`;

      const templateConfig: TemplateConfig = JSON.parse(fs.readFileSync(`${process.cwd()}/templates/${projectChoice}/template.json`, 'utf8'));
      const TemplateHandler = require(`./handlers/${templateConfig.handlerName}`);

      // Copy / Create template
      fs.mkdirSync(targetPath);
      createDirectoryContents(templatePath, targetPath);

      if (TemplateHandler) {
        new TemplateHandler(targetPath).inquire();
      } else {
        console.error('Handler not found', templateConfig.handlerName);
        process.exit(1);
      }
    });

  }
}
