# Project Gen

### Extendable code generator made with TypeScript

Project Gen (pgen) started as a double meaning. In which means the name of the project, as well as what it does (generate).

## The goal of Project Gen

To provide a method in which you can generate projects and code based on configurable templates and custom handlers.

# Getting Started - Local Development

To get started locally, follow these instructions:

1. If you haven't done it already, make a fork of this repo.
2. Clone to your local computer using git.
3. Make sure that you have Node 10.13 or later installed. 
4. Make sure that you have yarn installed.
5. Run yarn (no arguments) from the root of your clone of this project to install dependencies.

# Building and Installing the CLI

To make a local build:

```
yarn run build
```

This will generate a bin folder where the compiled output will be. All that needs to be done now is linking globally with `npm link` at the project root directory.

You can now use the tool with the command `pgen` and it will output the generated template of your choosing to the current directory.

# Creating Your Own Templates

This project uses handlebars for template generation. This was chosen over ejs because of the Angular style syntax.

1. Create a folder in `templates` with a name that makes sense.
2. Ensure a file named `template.json` exists. (Only requirement)
3. Create a custom handler in the `src/handlers` folder. You can use the others there for examples.
4. You can test by running the `pgen` command and selecting your template.

