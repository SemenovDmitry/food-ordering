import { NextFunction, Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import validate from 'middlewares/validate'

const productSchema = object({
  name: string().min(3),
})

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.product.findMany({ include: { brand: true, category: true } })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params

  try {
    const data = await prisma.product.findFirst({
      where: { id: Number(productId) },
      include: { brand: true, category: true },
    })

    if (!data) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  validate(productSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body

    try {
      const data = await prisma.product.create({
        data: product,
        include: { brand: true, category: true },
      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.put(
  '/:productId',
  validate(productSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params
    const product = req.body

    try {
      const data = await prisma.product.update({
        where: { id: Number(productId) },
        data: product,
        include: { brand: true, category: true },
      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.delete('/:productId', async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params

  try {
    const data = await prisma.product.delete({
      where: { id: Number(productId) },
      include: { brand: true, category: true },
    })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

export default router
