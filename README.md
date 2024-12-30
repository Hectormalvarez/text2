# TextShare

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, serverless text-sharing application built with Flask, Next.js, and AWS CDK.

## Project Status

**Currently in initial development.** Initial project setup complete, and we're starting with a Test-Driven Development (TDD) approach for the backend.

## Immediate Next Steps

### Backend (Flask)

- Implement core API endpoints (`/snippets`) for creating, retrieving, and deleting text snippets, following TDD.
- Set up in-memory storage for initial development.

### Frontend (Next.js)

- Develop UI components for creating and displaying text snippets.
- Implement API interaction to communicate with the backend.

### Infrastructure (CDK)

- Define API Gateway endpoints.
- Create Lambda functions to handle API requests and connect them to the Flask app.
- Configure deployment to AWS.

## Future Considerations

- **Persistent Storage:** Migrate from in-memory storage to a serverless database (e.g., DynamoDB) for production.
- **User Authentication:** Implement user accounts and authentication to associate snippets with users.
- **CI/CD:** Set up a robust CI/CD pipeline using GitHub Actions for automated testing, building, and deployment.
- **Enhanced Features:** Explore additional features like snippet editing, sharing, and search.

## Technologies Used

- Backend: Python, Flask, pytest
- Frontend: Next.js, React
- Infrastructure: AWS CDK, API Gateway, Lambda

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
