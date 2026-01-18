#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { makeRequest, MakeRequestArgs } from './tools/http.js';

// Create server instance
const server = new Server(
    {
        name: 'mcp-api-requester',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Define available tools
const tools: Tool[] = [
    {
        name: 'make_request',
        description: 'Make an arbitrary HTTP request (GET, POST, PUT, DELETE, etc.) with custom headers and body. Returns the status, headers, and body of the response.',
        inputSchema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    description: 'The full URL to make the request to.',
                },
                method: {
                    type: 'string',
                    description: 'HTTP method (GET, POST, PUT, DELETE, PATCH, etc.). Defaults to GET.',
                    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
                },
                headers: {
                    type: 'object',
                    description: 'Key-value pairs of HTTP headers.',
                    additionalProperties: { type: 'string' },
                },
                params: {
                    type: 'object',
                    description: 'Key-value pairs of URL query parameters.',
                    additionalProperties: { type: 'string' },
                },
                body: {
                    description: 'The request body. Can be a JSON object or string. Content-Type header should match this body.',
                },
            },
            required: ['url'],
        },
    },
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (!args) {
        return {
            content: [
                {
                    type: 'text',
                    text: 'Error: Missing arguments',
                },
            ],
            isError: true,
        };
    }

    try {
        switch (name) {
            case 'make_request': {
                const result = await makeRequest(args as unknown as MakeRequestArgs);
                return {
                    content: [
                        {
                            type: 'text',
                            text: result,
                        },
                    ],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('MCP API Requester Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
