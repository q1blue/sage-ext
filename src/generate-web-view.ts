export function generateWebviewContent(
  title: string,
  content?: string
): string {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          background-color: #1e1e1e;
          color: #c7c7c7;
          overflow-wrap: break-word;
          margin: 0;
        }

        h2 {
          border-bottom: 2px solid #3a3a3a;
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 1.5em;
          color: #e5e5e5;
        }

        pre {
          padding: 15px;
          background-color: #2e2e2e;
          border-radius: 5px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      <pre>${content}</pre>
    </body>
  </html>
  `;
}
