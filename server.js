/**
 * RESTful API for User Management
 * This API implements CRUD operations for managing users with logging and validation middleware
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// Parse incoming request bodies as JSON
app.use(express.json());

/**
 * LOGGING MIDDLEWARE
 * Logs details of each incoming request including method, URL, and response status
 * This middleware runs on every request
 */
app.use((req, res, next) => {
  // Store the original end function
  const originalEnd = res.end;

  // Override the end function to capture the response status
  res.end = function(chunk, encoding) {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    originalEnd.call(this, chunk, encoding);
  };

  next();
});

// ============================================================================
// IN-MEMORY DATA STORAGE
// ============================================================================

/**
 * Array to store all users
 * Each user has: id, firstName, lastName, hobby
 */
let users = [
  {
    id: '1',
    firstName: 'Anshika',
    lastName: 'Agarwal',
    hobby: 'Teaching'
  },
  {
    id: '2',
    firstName: 'Raj',
    lastName: 'Kumar',
    hobby: 'Reading'
  },
  {
    id: '3',
    firstName: 'Priya',
    lastName: 'Singh',
    hobby: 'Painting'
  }
];

// Counter for generating new user IDs
let nextId = 4;

// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================

/**
 * VALIDATION MIDDLEWARE for POST and PUT requests
 * Checks if all required fields (firstName, lastName, hobby) are present and not empty
 * Responds with 400 Bad Request if validation fails
 */
const validateUserInput = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'All fields (firstName, lastName, hobby) are required and must not be empty',
      receivedFields: {
        firstName: firstName ? 'provided' : 'missing',
        lastName: lastName ? 'provided' : 'missing',
        hobby: hobby ? 'provided' : 'missing'
      }
    });
  }

  // Check if fields are strings and not just whitespace
  if (typeof firstName !== 'string' || firstName.trim() === '' ||
      typeof lastName !== 'string' || lastName.trim() === '' ||
      typeof hobby !== 'string' || hobby.trim() === '') {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'All fields must be non-empty strings'
    });
  }

  next();
};

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /users
 * Fetch the list of all users
 * Returns: 200 OK with array of users
 */
app.get('/users', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * GET /users/:id
 * Fetch details of a specific user by ID
 * Returns: 200 OK with user data if found, 404 Not Found if user doesn't exist
 */
app.get('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find user by ID
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: `User with ID ${userId} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * POST /user
 * Add a new user to the list
 * Body: { firstName, lastName, hobby }
 * Returns: 201 Created with new user data if successful
 * Returns: 400 Bad Request if validation fails
 */
app.post('/user', validateUserInput, (req, res) => {
  try {
    const { firstName, lastName, hobby } = req.body;

    // Create new user object
    const newUser = {
      id: String(nextId++),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      hobby: hobby.trim()
    };

    // Add user to the array
    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * PUT /user/:id
 * Update details of an existing user
 * Body: { firstName, lastName, hobby }
 * Returns: 200 OK with updated user data if successful
 * Returns: 404 Not Found if user doesn't exist
 * Returns: 400 Bad Request if validation fails
 */
app.put('/user/:id', validateUserInput, (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, hobby } = req.body;

    // Find user by ID
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: `User with ID ${userId} not found`
      });
    }

    // Update user properties
    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.hobby = hobby.trim();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * DELETE /user/:id
 * Delete a user by ID
 * Returns: 200 OK with deleted user data if successful
 * Returns: 404 Not Found if user doesn't exist
 */
app.delete('/user/:id', (req, res) => {
  try {
    const userId = req.params.id;

    // Find user index
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        error: 'Not Found',
        message: `User with ID ${userId} not found`
      });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// ============================================================================
// 404 - ROUTE NOT FOUND
// ============================================================================

/**
 * Catch all unmatched routes and return 404 error
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} does not exist`
  });
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

/**
 * Global error handling middleware
 * Catches any unhandled errors and returns appropriate error response
 */
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message || 'An unexpected error occurred'
  });
});

// ============================================================================
// START SERVER
// ============================================================================

/**
 * Start the Express server
 * Listen on the specified PORT
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}
  `);
});

module.exports = app;
