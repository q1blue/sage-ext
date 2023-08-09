import * as vscode from "vscode";
import * as path from "path";
import axios from "axios";
import { writeFileSync } from "fs";

import { generateWebviewContent } from "./generate-web-view";

import { showAnalyzeBugPanel } from "./panels/show-analyze-bug-panel";
import { showRefactorPanel } from "./panels/show-refactor-panel";
import { showGenerateTestsPanel } from "./panels/show-generate-tests-panel";

const BASE_URL = "http://localhost:3000";

let refactorPanel: vscode.WebviewPanel | undefined = undefined;
let analyzeBugPanel: vscode.WebviewPanel | undefined = undefined;
let generateTestsPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "sage" is now active!');

  let refactorDisposable = vscode.commands.registerCommand(
    "sage.refactorCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const code = document.getText();

        const data = await apiCallWithProgress({
          title: "Refactoring Code",
          apiUrl: `${BASE_URL}/refactor-code`,
          payload: { code },
          successMessage: "Refatoração concluída!",
          errorMessage: "Error connecting to the backend.",
        });

        if (data && data.refactoredCode) {
          showRefactorPanel(data.refactoredCode, refactorPanel);
        } else {
          showRefactorPanel("No suggestions available.", refactorPanel);
        }
      }
    }
  );

  context.subscriptions.push(refactorDisposable);

  let docDisposable = vscode.commands.registerCommand(
    "sage.generateDoc",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const code = document.getText();

        const data = await apiCallWithProgress({
          title: "Generating documentation",
          apiUrl: `${BASE_URL}/generate-doc`,
          payload: { code: code },
          successMessage: "Documentação gerada com sucesso!",
          errorMessage: "Erro ao conectar ao backend.",
        });

        if (data && data.markdownContent) {
          const currentFilePath = editor.document.uri.fsPath;
          const currentDir = path.dirname(currentFilePath);
          const originalFilename = path.basename(currentFilePath);
          const docFilename = path.parse(originalFilename).name + ".md";
          const filePath = path.join(currentDir, docFilename);
          writeFileSync(filePath, data.markdownContent);
        } else {
          vscode.window.showErrorMessage("Erro ao gerar documentação.");
        }
      }
    }
  );

  context.subscriptions.push(docDisposable);

  let analyzeBugDisposable = vscode.commands.registerCommand(
    "sage.analyzeBug",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const code = document.getText();

        const data = await apiCallWithProgress({
          title: "Analyzing Code for Bugs",
          apiUrl: `${BASE_URL}/analyze-bugs`,
          payload: { code },
          successMessage: "Análise de bug concluída.",
          errorMessage: "Error connecting to the backend.",
        });

        if (data && data.analyze) {
          showAnalyzeBugPanel(data.analyze, analyzeBugPanel);
        } else {
          showAnalyzeBugPanel(
            "No bugs or anti-patterns found.",
            analyzeBugPanel
          );
        }
      }
    }
  );

  context.subscriptions.push(analyzeBugDisposable);

  let generateTestsDisposable = vscode.commands.registerCommand(
    "sage.generateTests",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const code = document.getText();

        const data = await apiCallWithProgress({
          title: "Generate Tests",
          apiUrl: `${BASE_URL}/generate-tests`,
          payload: { code },
          successMessage: "Geração de testes concluída.",
          errorMessage: "Error connecting to the backend.",
        });

        if (data && data.test) {
          showGenerateTestsPanel(data.test, generateTestsPanel);
        } else {
          showGenerateTestsPanel(
            "No bugs or anti-patterns found.",
            generateTestsPanel
          );
        }
      }
    }
  );

  context.subscriptions.push(generateTestsDisposable);

  context.subscriptions.push(
    vscode.window.registerWebviewPanelSerializer("sageRefactor", {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        webviewPanel.webview.html = generateWebviewContent(
          "Restored content or any placeholder content"
        );
        refactorPanel = vscode.window.createWebviewPanel(
          "sageRefactor",
          "Sage Refactor",
          vscode.ViewColumn.Two,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
          }
        );
      },
    })
  );
}

async function apiCallWithProgress({
  title,
  apiUrl,
  payload,
  successMessage,
  errorMessage,
}: {
  title: string;
  apiUrl: string;
  payload: any;
  successMessage: string;
  errorMessage: string;
}): Promise<any> {
  return new Promise((resolve, reject) => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: title,
        cancellable: false,
      },
      async (progress) => {
        progress.report({ increment: 25 });

        try {
          const response = await axios.post(apiUrl, payload);

          setTimeout(() => progress.report({ increment: 75 }), 1500);

          if (response.data) {
            vscode.window.showInformationMessage(successMessage);

            setTimeout(() => progress.report({ increment: 100 }), 1500);

            resolve(response.data);
          } else {
            reject(new Error(errorMessage));
          }
        } catch (error) {
          vscode.window.showErrorMessage(errorMessage);
          reject(error);
        }
      }
    );
  });
}

export function deactivate() {}
