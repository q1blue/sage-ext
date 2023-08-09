# Sage VS Code Extension

Sage is a VS Code extension that provides developers with a suite of tools to enhance their coding experience. With features like code refactoring, bug analysis, test generation, and documentation generation, Sage aims to streamline the development process and improve code quality.

## Features
1. **Code Refactoring**: Get suggestions to improve and refactor your code.
2. **Bug Analysis**: Analyze your code to find potential bugs or anti-patterns.
3. **Test Generation**: Automatically generate tests based on your code.
4. **Documentation Generation**: Generate markdown documentation for your code.

## Usage
Open the command palette (**Ctrl+Shift+P** or **Cmd+Shift+P** on *macOS*) and select:

#### Refactor Code
To refactor your code, open the command pallet and run:
```
Sage: Refactor Code
```

#### Analyze for Bugs
To analyze your code for potential bugs, open the command palette and run:
```
Sage: Analyze Bug
```

#### Generate Tests
To generate tests for your code, open the command palette and run:
```
Sage: Generate Tests
```

#### Generate Documentation
To generate markdown documentation for your code, open the command palette and run:
```
Sage: Generate Documentation
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```
2. Navigate to the directory:
```bash
cd [repository-name]
```
3. Install the required dependencies:
```bash
npm install
```
4. Package the extension:
```bash
vsce package
```
5. Install the extension to VS Code:
```bash
code --install-extension sage-[version].vsix
```

## Configuration
By default, the extension connects to **http://localhost:3000** for backend services. You can change this by updating the `BASE_URL` constant in extension.ts

## Setting Up the Backend Server
To ensure the Sage extension functions correctly, you'll need to set up and run the backend server provided in this repository: [Sage Backend Repository](https://github.com/thiagoadsix/sage).

#### Steps:
1. Clone the backend repository:
```bash
git clone https://github.com/thiagoadsix/sage.git
```
2. Navigate to the cloned directory:
```bash
cd sage
```
3. Select the version requried version for NodeJS:
```bash
nvm use
```
4. Install the required dependencies:
```bash
npm i
```
5. Before starting the server, you need to set up the environment variables. Create a `.env` file in the root directory of the project and add the following:
```makefile
OPEN_API_KEY=YOUR_OPENAI_API_KEY
OPEN_API_ORG=YOUR_OPENAI_ORG_ID  # This is optional
```
Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key and YOUR_OPENAI_ORG_ID with your OpenAI organization ID (if you have one).

6. Once the environment variables are set, you can start the server:
```bash
npm run start
```

The server will start and by default listen on `http://localhost:3000`. Ensure the BASE_URL in the Sage extension is set to this URL or update it accordingly if you change the server's listening address.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
