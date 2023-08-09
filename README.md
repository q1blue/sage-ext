# CodeGuru VS Code Extension

CodeGuru is a VS Code extension that provides developers with a suite of tools to enhance their coding experience. With features like code refactoring, bug analysis, test generation, and documentation generation, CodeGuru aims to streamline the development process and improve code quality.

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
CodeGuru: Refactor Code
```

#### Analyze for Bugs
To analyze your code for potential bugs, open the command palette and run:
```
CodeGuru: Analyze Bug
```

#### Generate Tests
To generate tests for your code, open the command palette and run:
```
CodeGuru: Generate Tests
```

#### Generate Documentation
To generate markdown documentation for your code, open the command palette and run:
```
CodeGuru: Generate Documentation
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
code --install-extension codeguru-[version].vsix
```

## Configuration
By default, the extension connects to **http://localhost:3000** for backend services. You can change this by updating the `BASE_URL` constant in extension.ts

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.