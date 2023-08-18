import { Router } from 'express'
import { object, string } from 'zod'

import validateBody from 'middlewares/validateBody'
import withPagination from 'middlewares/withPagination'
import tryCatch from 'middlewares/tryCatch'
import auth from 'middlewares/auth'
import validateParams from 'middlewares/validateParams'

import getBrands from './getBrands'
import getBrand from './getBrand'
import createBrand from './createBrand'
import updateBrand from './updateBrand'
import deleteBrand from './deleteBrand'

const brandSchema = object({
  name: string().min(3),
}).strict()

const paramsSchema = object({
  brandId: string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val), {
      message: 'brandId must be a number',
    }),
})

const router = Router()

router.get('/', withPagination, tryCatch(getBrands))
router.get('/:brandId', validateParams(paramsSchema), tryCatch(getBrand))
router.post(
  '/',
  auth,
  validateParams(paramsSchema),
  validateBody(brandSchema),
  tryCatch(createBrand),
)
router.put(
  '/:brandId',
  auth,
  validateParams(paramsSchema),
  validateBody(brandSchema),
  tryCatch(updateBrand),
)
router.delete('/:brandId', auth, validateParams(paramsSchema), tryCatch(deleteBrand))

export default router
