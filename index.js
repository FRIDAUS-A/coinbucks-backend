require('dotenv').config();
require('express-async-errors'); // handle async errors
const express = require('express');
const displayRoutes = require('express-routemap');
const { errorHandlerMiddleware } = require('./middleware/error-handler.middleware');
const { notFoundMiddleware } = require('./middleware/not-found.middleware');;
const { 
    auditRouter, 
    transactionRouter 
} = require('./route');
const app = express();
// swagger initialization and assignment
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const corsOptions = {
  origin: '*', // Allow all origin
  credentials: false, // Allow cookies if needed
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Authorization']
};
const port = process.env.PORT || 5000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.set('trust proxy', true);

app.use('/api/v1', transactionRouter);
app.use('/api/v1', auditRouter)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
    displayRoutes(app);
    console.log(`Server is running on port ${port}`);
});