import fs from 'fs';
import Handlebars from 'handlebars';
import validateNpmPackageName from "validate-npm-package-name";
import inquirer from "inquirer";

class TypescriptBackendHandler {

  private readonly QUESTIONS = [
    {
      name: "package-name",
      type: "input",
      message: "Package name:",
      validate(input: string) {
        if (input.length && validateNpmPackageName(input)) return true;
        return "Invalid package name";
      },
    },
  ]

  constructor(private targetPath: string) {}

  public inquire() {
    inquirer.prompt(this.QUESTIONS).then(async (answers: Record<string, any>) => {
      const packageName = answers["package-name"];

      this.processFile('package.json', {packageName});
      this.processFile('README.md', {packageName});
    });
  }

  private processFile(filename: string, data: any) {
    var source = fs.readFileSync(`${this.targetPath}/${filename}`);
    var template = Handlebars.compile(source.toString());

    const result = template(data);
    fs.writeFileSync(`${this.targetPath}/${filename}`, result);
  }
}

module.exports = TypescriptBackendHandler;