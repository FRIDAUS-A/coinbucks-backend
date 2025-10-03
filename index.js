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
const port = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1', transactionRouter);
app.use('/api/v1', auditRouter)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
app.listen(port, () => {
    displayRoutes(app);
    console.log(`Server is running on port ${port}`);
});