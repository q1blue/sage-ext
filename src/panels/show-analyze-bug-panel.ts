import * as vscode from "vscode";

import { generateWebviewContent } from "../generate-web-view";

export function showAnalyzeBugPanel(
  content: string,
  analyzePanel: vscode.WebviewPanel | undefined
) {
  if (analyzePanel) {
    analyzePanel.webview.html = generateWebviewContent(
      "Resultado da análise:",
      content
    );
    analyzePanel.reveal(vscode.ViewColumn.Two);
  } else {
    analyzePanel = vscode.window.createWebviewPanel(
      "sageAnalyze",
      "Sage Analysis",
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
      }
    );

    analyzePanel.onDidDispose(
      () => {
        analyzePanel = undefined;
      },
      null,
      []
    );
  }

  analyzePanel.webview.html = generateWebviewContent(
    "Resultado da análise:",
    content
  );
}
