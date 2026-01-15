const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const userRoutes = require('./src/routes/users');
const conferenceRoutes = require('./src/routes/conferenceRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

app.use('/api/users', userRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

module.exports = app;

// Start server
if (!module.parent) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
