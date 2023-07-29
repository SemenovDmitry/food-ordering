import { NextFunction, Request, Response, Router } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import validate from 'middlewares/validate'
import withPagination from 'middlewares/withPagination'
import getPaginatedData from 'queries/getPaginatedData'

type IParams = {
  categoryId: string
}

type ICreateCategory = zod.infer<typeof categorySchema>
type IUpdateCategory = zod.infer<typeof categorySchema>

const categorySchema = object({
  name: string().min(3),
}).strict()

const router = Router()

router.get('/', withPagination, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getPaginatedData({ modelName: 'category', pagination: req.pagination })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params as IParams

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
})

router.post(
  '/',
  validate(categorySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const category: ICreateCategory = req.body

    try {
      const data = await prisma.category.create({ data: category })
      return res.status(201).json(data)
    } catch (error) {
      return next(error)
    }
  },
)

router.put(
  '/:categoryId',
  validate(categorySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params as IParams
    const category: IUpdateCategory = req.body

    try {
      const data = await prisma.category.update({
        where: { id: Number(categoryId) },
        data: category,
      })
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.delete('/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params as IParams

  try {
    const data = await prisma.category.delete({
      where: { id: Number(categoryId) },
    })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

export default router
