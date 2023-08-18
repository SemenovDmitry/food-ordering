import { NextFunction, Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import validateBody from 'middlewares/validateBody'
import validateParams from 'middlewares/validateParams'
import withPagination from 'middlewares/withPagination'
import getPaginatedProducts from 'queries/getPaginatedProducts'
import tryCatch from 'middlewares/tryCatch'

type IParams = {
  productId: number
}

const productSchema = object({
  name: string().min(3),
}).strict()

const paramsSchema = object({
  productId: string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val), {
      message: 'productId must be a number',
    }),
})

const router = Router()

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const data = await getPaginatedProducts(req.pagination)

  return res.status(200).json(data)
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params as unknown as IParams

  const data = await prisma.product.findFirst({
    where: { id: productId },
    include: { brand: true, category: true },
  })

  if (!data) {
    return res.status(404).json({ error: 'Not found' })
  }

  return res.status(200).json(data)
}

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = req.body

  const data = await prisma.product.create({
    data: product,
    include: { brand: true, category: true },
  })

  return res.status(201).json(data)
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params as unknown as IParams
  const product = req.body

  const data = await prisma.product.update({
    where: { id: productId },
    data: product,
    include: { brand: true, category: true },
  })

  return res.status(201).json(data)
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params as unknown as IParams

  const data = await prisma.product.delete({
    where: { id: productId },
    include: { brand: true, category: true },
  })

  return res.status(200).json(data)
}

router.get('/', withPagination, tryCatch(getProducts))
router.get('/:productId', validateParams(paramsSchema), tryCatch(getProduct))
router.post('/', validateBody(productSchema), tryCatch(createProduct))
router.put(
  '/:productId',
  validateParams(paramsSchema),
  validateBody(productSchema),
  tryCatch(updateProduct),
)
router.delete('/:productId', validateParams(paramsSchema), tryCatch(deleteProduct))

export default router
