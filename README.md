# Application run guide

The following instructions will walk you through the steps to set up and run the test application using Docker.

1. Verify Docker Installation
Ensure Docker is installed and running on your machine.
If Docker is not installed, download it from Docker's official website and follow the installation instructions.

1. Load the Docker Image
Download file by this link - https://drive.google.com/file/d/1XUUiK7BEqRq9bqPAmrJSwwiYSx0-ytuJ/view?usp=share_link
Navigate to the directory containing the Docker image file (apple-ind-test-assignment.tar)
and run the following command to load the image into Docker:
    docker load -i apple-ind-test-assignment.tar

1. Run the Docker Container
    docker run -p 3000:3000 -p 5173:5173 apple-ind-test-assignment

1. Verify Application Accessibility
Once the container is running, verify that the application is accessible:
    Frontend: http://localhost:5173
    Server API: http://localhost:3000/products

1. Examine the Server API
To explore the server API, open the Postman application. Navigate to My Workspace -> Import.
Select the provided Server API.postman_collection.json file to import the API specification.

## Test run guide

1. Run Playwright Tests
Ensure you have Node.js installed on your machine. If not, download and install it from the official Node.js website.

Navigate to the project directory and install the dependencies:
    npm install

Run the Playwright tests using the following command:
    npx playwright test

The test results will be displayed in the terminal. You can also generate an HTML report by running:
    npx playwright show-report

1. Install VS Code Extension for Playwright (if you use one)
To simplify running Playwright tests, you can install the Playwright Test for VS Code extension:

- Open Visual Studio Code.
- Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
- In the search box, type `Playwright Test for VS Code` and press Enter.
- Click the Install button for the Playwright Test for VS Code extension.

Once installed, you can run and debug Playwright tests directly from the VS Code interface.
