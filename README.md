# Ollama Chat Interface

This project is a React-based chat interface for interacting with Ollama, an AI language model. It provides a user-friendly interface for chatting with the AI, along with settings to choose different models and check the Ollama service status.

## Features

- Real-time chat interface with Ollama AI
- Typing effect for AI responses
- User and AI messages displayed in a chat-like format
- Settings modal to select different AI models
- Status check for Ollama service availability
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Ollama service running locally on port 11434

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/fshang/ollama-chat-interface.git
   ```

2. Navigate to the project directory:
   ```
   cd ollama-chat-interface
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and visit `http://localhost:3000`

3. Start chatting with the AI!

4. To change models or check the Ollama service status, click the settings icon (⚙️) in the top right corner.

## Configuration

The default Ollama API endpoint is set to `http://localhost:11434`. If your Ollama service is running on a different port or host, you'll need to update the API calls in `src/App.js` and `src/Settings.js`.

## Contributing

Contributions to the Ollama Chat Interface are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses the Ollama API for AI interactions.
- UI inspired by modern chat applications.
