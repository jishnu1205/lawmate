# LawMate: AI-Powered Legal Assistant

## Project Overview

LawMate is an AI-powered legal assistant designed to provide users with accessible, structured, and accurate legal guidance through a conversational interface. The application leverages Google's Gemini 1.5 Pro model to generate legal advice in a clear, segmented format. The goal of LawMate is to democratize access to foundational legal information, particularly for individuals without immediate access to professional legal counsel.

## Key Features

* **AI-Driven Legal Guidance:** Uses Gemini 1.5 Pro to generate structured legal advice based on user queries.
* **Interactive UI:** Built with React and Material UI to offer a smooth and responsive experience.
* **Example Questions:** Users can quickly select from common legal queries.
* **Structured Output:** Answers are organized into sections like Title, Prerequisites, Step-by-Step Guide, Important Information, and Additional Resources.
* **Error Handling:** Gracefully manages API errors and network issues.

## Technologies Used

* **Frontend:** React, Material UI, JavaScript
* **Backend:** Google Gemini 1.5 Pro API
* **Styling:** Material UI components with customized themes
* **Deployment:** Web-based interface

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/lawmate.git
   cd lawmate
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:

   * Create a `.env` file with the following:

     ```env
     REACT_APP_GEMINI_API_KEY=your_api_key_here
     ```
4. Run the application:

   ```bash
   npm start
   ```

## Usage

* Open the application in your browser.
* Enter your legal question or click on one of the example questions.
* Submit the query to receive structured legal advice.

## How It Works

1. User inputs a legal question via a text field.
2. The application sends the query to the Gemini 1.5 Pro model using a structured prompt.
3. The model returns a segmented response, which is parsed and displayed on the frontend.
4. Users can explore additional guidance and repeat queries as needed.

## Advantages Over Regular Search Engines

* **Structured Output:** No need to sift through multiple web pages.
* **Contextual Understanding:** Captures the nuance of legal questions.
* **No Ads or Clickbait:** Pure, focused content without distractions.

## Limitations

* LawMate does not replace professional legal advice.
* Responses are based on general legal principles and may not apply to specific jurisdictions.

## License

This project is licensed under the MIT License.

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For any issues or suggestions, please open an issue on GitHub or contact the project maintainer.