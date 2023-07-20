import { NextFunction, Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import useBodyValidator from 'utils/useBodyValidator'

const categorySchema = object({
  name: string().min(3),
})

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.category.findMany()
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:categoryId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params as { categoryId: string }

    try {
      const data = await prisma.category.findFirst({
        where: { id: Number(categoryId) },
      })

      if (!data) {
        return res.status(404).json({ error: 'Not found' })
      }

      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  '/',
  useBodyValidator(categorySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.body

    try {
      const data = await prisma.category.create({ data: category })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.put(
  '/:categoryId',
  useBodyValidator(categorySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params
    const category = req.body

    try {
      const data = await prisma.category.update({
        where: { id: Number(categoryId) },
        data: category,
      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.delete(
  '/:categoryId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params

    try {
      const data = await prisma.category.delete({
        where: { id: Number(categoryId) },
      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

export default router
