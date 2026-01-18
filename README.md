# MCP API Requester

A Model Context Protocol (MCP) server that enables LLMs to make arbitrary HTTP API requests (GET, POST, PUT, DELETE, etc.) with custom headers and bodies. Works with Claude Desktop and other MCP-compatible AI tools.

## Features

- 🌐 **HTTP Operations**: Make any HTTP request (GET, POST, PUT, DELETE, PATCH, etc.)
- 🔧 **Custom Configuration**: Full control over headers, query parameters, and request body
- 📄 **JSON Support**: Native handling of JSON request and response bodies
- 🛠 **Robust Error Handling**: Returns 4xx/5xx responses as structured data instead of failing, allowing the LLM to inspect errors
- 🔒 **Safe Execution**: Useful for testing APIs, webhooks, and interacting with external services

## Installation

### Using npx (Recommended)

No installation needed! Just configure Claude Desktop to use npx:

```json
{
  "mcpServers": {
    "api-requester": {
      "command": "npx",
      "args": [
        "-y",
        "github:yryuu/mcp-api-requester"
      ]
    }
  }
}
```

### Local Installation

```bash
git clone <repository-url>
cd mcp-api-requester
npm install
npm run build
```

## Configuration

### Claude Desktop

Edit your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the server configuration:

```json
{
  "mcpServers": {
    "api-requester": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-api-requester/dist/index.js"]
    }
  }
}
```

## Available Tools

### `make_request`

Make an arbitrary HTTP request.

**Parameters:**
- `url` (string): The full URL to make the request to.
- `method` (string): HTTP method (GET, POST, PUT, DELETE, PATCH, etc.). Defaults to GET.
- `headers` (object, optional): Key-value pairs of HTTP headers.
- `params` (object, optional): Key-value pairs of URL query parameters.
- `body` (object/string, optional): The request body. Content-Type header should match this body.

**Example (GET):**
```
Make a GET request to https://api.example.com/users?id=123
```

**Example (POST):**
```
POST to https://api.example.com/data with content-type application/json and body {"key": "value"}
```

## Development

### Setup

```bash
cd mcp-api-requester
npm install
```

### Build

```bash
npm run build
```

### Testing

Run the included manual test script:

```bash
npm test
```
> Note: uses `tsx` to run the TypeScript test file directly.

### Debugging

Use the MCP Inspector to test the server:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Security

- **Warning**: This tool enables the LLM to make requests to **any** URL you provide or it discovers.
- Ensure you only use this in a trusted environment.
- Be cautious when asking the LLM to interact with sensitive APIs or internal services.

## License

MIT

## Author

yryuu
