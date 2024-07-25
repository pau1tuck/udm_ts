# UDM Player

This is a prototype for the Underground Dance Music project (UDM GmbH.)

UDM Player is a sophisticated web application designed to revolutionize the experience of streaming underground dance music (UDM). Inspired by platforms like Spotify, UDM Player offers a tailored environment for fans of electronic house and techno music to explore, play, and enjoy their favorite tracks. This project leverages a robust full-stack architecture, employing the latest in web technologies to ensure a seamless and responsive user experience.

## Technologies Used

- **PostgreSQL**: Our choice for the relational database, PostgreSQL offers advanced features and supports complex queries, making it ideal for handling our music metadata and user data efficiently.
- **Express.js**: As the backend framework running on Node.js, Express simplifies the setup of our server and routes, providing a lightweight layer to handle our API requests.
- **React**: Powers the frontend, providing a dynamic and responsive user interface. We use React to handle the state and presentation of the music player, playlists, and user interactions.
- **Node.js**: Serves as the runtime environment for our backend, chosen for its non-blocking, event-driven architecture which is great for data-intensive real-time applications that run across distributed devices.
- **Redis**: Utilized as a session store, Redis offers rapid data access, which is crucial for managing user sessions and caching frequently accessed data.
- **Apollo GraphQL**: Enhances the efficiency of interfacing between our frontend and backend, allowing clients to request exactly what they need, reducing the bandwidth and improving the responsiveness of our application.
- **TypeORM**: This is integrated to abstract and manage database interactions more effectively. It supports TypeScript out of the box, promoting type safety and reducing runtime errors.
- **TypeGraphQL**: Merges GraphQL with TypeScript, creating a framework that simplifies the process of building GraphQL APIs by defining schemas with classes and decorators.
- **Next.js**: Provides a framework for server-rendered React applications, enhancing SEO, and improving performance with features like automatic code splitting.
- **Chakra UI**: Used for designing the UI, this simple, modular, and accessible component library allows us to build the application quickly and with visual consistency.
- **React-Hook-Form**: Facilitates the management of form state in React, providing validation and handling form submission, leading to smoother and more predictable forms handling.
- **Yup**: Integrated for object schema validation, Yup allows us to describe the structure of API inputs and validate the data with a clear, schema-based approach.

## Features

- **Music Streaming**: Stream electronic house and techno tracks directly through the browser.
- **User Authentication**: Secure session-based authentication to manage user accounts and sessions.
- **Playlist Management**: Users can create, modify, and delete their playlists.
- **Search and Filter**: Advanced search and filtering capabilities to easily find tracks and artists.

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/udm-player.git
   cd udm-player

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   - Copy the `.env.example` file to `.env` and fill in the necessary database credentials and API keys.

4. **Initialize the database:**
   - Run the schema migrations and seed the database with initial data:
     ```bash
     npm run db:migrate
     npm run db:seed
     ```

5. **Start the development servers:**
   ```bash
   npm run dev
   ```

