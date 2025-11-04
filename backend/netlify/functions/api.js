import serverless from 'serverless-http';
import { app } from '../../app.js';
import { connectDB } from '../../data/database.js';

// Connect to database once when the function cold starts
let dbConnected = false;

const handler = async (event, context) => {
  // Only connect to DB if not already connected
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  
  // Return the serverless handler
  return serverless(app)(event, context);
};

export { handler };
