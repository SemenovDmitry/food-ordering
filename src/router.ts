import { Router } from 'express'

import categoryController from '/controllers/categoryController'
import brandController from '/controllers/brandController'
import menuController from '/controllers/menuController'
import productController from '/controllers/productController'

const router = Router()

router.use('/categories', categoryController)
router.use('/brands', brandController)
router.use('/menu', menuController)
router.use('/products', productController)

export default router
