# Text Justification API

This project is a REST API that justifies text input to a specified width limit. It includes token-based authentication, rate limiting, and deploys via a public URL or IP address. The project is built using Node.js and TypeScript.

## Features

- **Token Authentication**: Secured endpoints require a token for access.
- **Text Justification**: Justifies text to an 80-character width.
- **Rate Limiting**: Limits requests based on word count per token.
- **Swagger Documentation**: Accessible at `/api/docs`.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

## Setup

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Configuration**:
    - Create a `.env` file in the root directory with:
      ```env
      PORT=3000
      JWT_SECRET=<your_jwt_secret>
      WORDS_LIMIT=80000
      ```
    - Customize `JWT_SECRET` and `WORDS_LIMIT` as needed.

4. **Run the Server**:
    ```bash
    npx ts-node src/app.ts
    ```
   The server will start on `http://localhost:3000`.

## Endpoints

- **Generate Token**: `POST /api/token` - Generate a token using `{ email: "example@example.com" }`.
- **Justify Text**: `POST /api/justify` - Requires Authorization header with `Bearer <token>`.
- **Swagger Documentation**: Available at `/api/docs`.

## Testing

To run tests:
```bash
npm run test
# or
yarn test
