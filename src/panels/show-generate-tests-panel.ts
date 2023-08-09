import * as vscode from "vscode";

import { generateWebviewContent } from "../generate-web-view";

export function showGenerateTestsPanel(
  content: string,
  refactorPanel: vscode.WebviewPanel | undefined
) {
  if (refactorPanel) {
    refactorPanel.webview.html = generateWebviewContent("Seu teste:", content);
    refactorPanel.reveal(vscode.ViewColumn.Two);
  } else {
    refactorPanel = vscode.window.createWebviewPanel(
      "codeGuruGenerateTests",
      "Code Guru Generate Tests",
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

  refactorPanel.webview.html = generateWebviewContent("Seu teste:", content);
}
