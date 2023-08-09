import * as vscode from "vscode";

import { generateWebviewContent } from "../generate-web-view";

export function showRefactorPanel(
  content: string,
  refactorPanel: vscode.WebviewPanel | undefined
) {
  if (refactorPanel) {
    refactorPanel.webview.html = generateWebviewContent(
      "Dicas para melhoria:",
      content
    );
    refactorPanel.reveal(vscode.ViewColumn.Two);
  } else {
    refactorPanel = vscode.window.createWebviewPanel(
      "sageRefactor",
      "Sage Refactor",
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
      }
    );

    refactorPanel.onDidDispose(
      () => {
        refactorPanel = undefined;
      },
      null,
      []
    );
  }

  refactorPanel.webview.html = generateWebviewContent(
    "Dicas para melhoria:",
    content
  );
}
