import { Router } from 'express'

import authController from 'controllers/authController'
import brandController from 'controllers/brandController'
import categoryController from 'controllers/categoryController'
import menuController from 'controllers/menuController'
import productController from 'controllers/productController'
import auth from 'middlewares/auth'

const router = Router()

router.use('/auth', authController)
router.use('/categories', categoryController)
router.use('/brands', brandController)
router.use('/menu', menuController)
router.use('/products', productController)

// router.use('/protected', auth, protectedControllers)

export default router
