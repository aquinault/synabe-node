import logger from '../conf/logger';
import restify from 'restify';
import userController from '../controllers/usersController'
class UsersApi{
    constructor(server){
        this.name = 'Users API!';
        logger.info("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        logger.error(err.stack);
    }
    init(server){
        // Get Users
        server.get('/auth/users/', (req, res, next) => {
            let fn = userController.list();
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        // Get User by id
        server.get('/auth/users/byId/:id', (req, res, next) => {
            let fn = userController.getById(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        // Get User by username
        server.get('/auth/users/byUsername/:username', (req, res, next) => {
            let fn = userController.getByUsername(req.params.username);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        // Create user
        server.post('/auth/user/', (req, res, next) => {
            let admin = false; // User privilege
            let fn = userController.create(req.body.username, req.body.password, req.body.email, admin);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        // Delete user
        server.del('/auth/user/:id', (req, res, next) => {
            let fn = userController.remove(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        // Update User
        server.put('/auth/users/:id', (req, res, next) => {           
            let fn = userController.update(req.params.id, req.body);
            fn.then((results) => {
                logger.info('user update OK');
                res.send(results);
            }, (err) => {
                logger.error('user update KO');
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });

            return next();
        });

        // Login User
        server.post('/auth/login/', (req, res, next) => {
            let fn = userController.get(req.body.username, req.body.password);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

    }
}

module.exports = UsersApi; //set what can be imported from this file