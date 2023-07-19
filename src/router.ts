import { Router } from 'express'

import categories from 'modules/categories'
import brands from 'modules/brands'
import menu from 'modules/menu'
import products from 'modules/products'

const router = Router()

router.use('/categories', categories)
router.use('/brands', brands)
router.use('/menu', menu)
router.use('/products', products)

export default router
