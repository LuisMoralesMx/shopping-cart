import express from "express";
import ProfileController from "../controllers/profile";
import ProductsController from "../controllers/products";
import UserController from "../controllers/user";
import HealthController from "../controllers/health";
import { logger } from "../utils/logger";

const router = express.Router();

router.post('/api/profile/cart', async (req, res) => {
    try {
        const controller = new ProfileController();
        const response = await controller.createCart(req.body)        
        res.send(response);
        res.status(201);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.status);
        res.status(error.message);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/api/profile/cart', async (req, res) => {
    try {
        const controller = new ProfileController();
        const response = await controller.getCart();
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.status);
        res.status(error.message);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.put('/api/profile/cart', async (req, res) => {
    try {
        const controller = new ProfileController();
        const response = await controller.updateCart(req.body);
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.delete('/api/profile/cart', async (req, res) => {
    try {
        const controller = new ProfileController();
        const response = await controller.deleteCart(req.user, req.body);
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/api/profile/cart/checkout', async (req, res) => {
    try {
        const controller = new ProfileController();
        const response = await controller.checkoutCart(req.body);
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/api/products', async (req, res) => {
    try {
        const controller = new ProductsController();
        const response = await controller.getProducts();
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/api/products/productId', async (req, res) => {
    try {
        const controller = new ProductsController();
        const params: any = req.params;
        const response = await controller.getProductById(params.id);
        res.send(response);
        res.status(200);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/user', async (req, res) => {
    try {
        const controller = new UserController();
        const response = await controller.users()
        res.send(response);
        res.status(201);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/user/login', async (req, res) => {
    try {
        const controller = new UserController();
        const response = await controller.login(req.body)
        res.send(response);
        res.status(201);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.post('/user/register', async (req, res) => {
    try {
        const controller = new UserController();
        const response = await controller.register(req.body)
        res.send(response);
        res.status(201);
        logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);

    } catch (error: any) {
        res.send(error.message);
        res.status(error.status);
        logger.error(`An error has ocurred: Error Code: ${error.status}, Error Status: ${error.message}`);
    }
});

router.get('/health', async (req, res) => {
    const controller = new HealthController();
    const response = await controller.health();
    res.send(response.message);
    res.status(response.status);
    logger.info(`Request Method: ${req.method}, Request Path: ${req.path}, Response Time: ${res.get('X-Response-Time')} `);
});

export default router;