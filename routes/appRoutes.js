const manufactureRoutes = require('./manufactureRoutes');
const usersRouter = require('./users');
const PurchaseRoutes = require('./PurchaseRoutes');
const DocumentationRoutes = require('./DocumentationRoutes');

const bindRoutes = (expressApp) => {
    expressApp.use('/manufacture', manufactureRoutes);
    expressApp.use('/users', usersRouter);
    expressApp.use('/purchases', PurchaseRoutes);
    expressApp.use('/doc', DocumentationRoutes);
}

module.exports = bindRoutes;