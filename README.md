# TextShare

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, serverless text-sharing application built with Flask, Next.js, and AWS CDK.

## Project Status

**In active development.** The backend API now supports creating, retrieving, and deleting snippets. The frontend provides forms for creating and retrieving snippets and displays them. The application is dockerized and runs behind an Nginx proxy. We're continuing to develop the application with a Test-Driven Development (TDD) approach.

## Recent Updates

- **Backend (Flask):** Implemented core API endpoints (`/snippets` and `/snippets/{id}`) for creating, retrieving, and deleting text snippets. Currently using in-memory storage.
- **Frontend (Next.js):** Implemented forms for creating and retrieving snippets. Basic styling and error handling are in place. Integration with the backend API allows for creating and displaying snippets.
- **Deployment:** Dockerized the application and set up an Nginx proxy.

## Immediate Next Steps

### Backend (Flask)

- Migrate from in-memory storage to a persistent database solution (e.g., DynamoDB).
- Implement more robust error handling and input validation.

### Frontend (Next.js)

- Improve UI/UX and styling.
- Implement snippet editing functionality.

### Infrastructure (CDK)

- Begin implementing CDK infrastructure for AWS deployment (API Gateway, Lambda).

## Future Considerations

- **User Authentication:** Implement user accounts and authentication to associate snippets with users.
- **CI/CD:** Set up a robust CI/CD pipeline using GitHub Actions for automated testing, building, and deployment.
- **Enhanced Features:** Explore additional features like snippet sharing, searching, and syntax highlighting.

## Technologies Used

- Backend: Python, Flask, pytest
- Frontend: Next.js, React, TypeScript, Jest
- Infrastructure: AWS CDK, API Gateway, Lambda (planned), Docker, Nginx

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
