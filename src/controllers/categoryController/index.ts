import { NextFunction, Request, Response, Router } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import validateBody from 'middlewares/validateBody'
import validateParams from 'middlewares/validateParams'
import withPagination from 'middlewares/withPagination'
import tryCatch from 'middlewares/tryCatch'
import auth from 'middlewares/auth'

type IParams = {
  categoryId: number
}

type ICreateCategory = zod.infer<typeof categorySchema>
type IUpdateCategory = zod.infer<typeof categorySchema>

const categorySchema = object({
  name: string().min(3),
}).strict()

const paramsSchema = object({
  categoryId: string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val), {
      message: 'categoryId must be a number',
    }),
})

const router = Router()

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { page, pageSize } = req.pagination

  const skip = (page - 1) * pageSize
  const take = pageSize

  const [data, count] = await prisma.$transaction([
    prisma.category.findMany({
      take,
      skip,
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.category.count(),
  ])

  const totalPages = Math.ceil(count / pageSize)

  const response = {
    meta: {
      count,
      totalPages,
    },
    data,
  }

  return res.status(200).json(response)
}

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params as unknown as IParams

  const data = await prisma.category.findFirst({
    where: { id: categoryId },
  })

  if (!data) {
    return res.status(404).json({ error: 'Not found' })
  }

  return res.status(200).json(data)
}

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const category: ICreateCategory = req.body

  const data = await prisma.category.create({ data: category })

  return res.status(201).json(data)
}

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params as unknown as IParams

  const category: IUpdateCategory = req.body

  const data = await prisma.category.update({
    where: { id: categoryId },
    data: category,
  })

  return res.status(201).json(data)
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params as unknown as IParams

  const data = await prisma.category.delete({
    where: { id: categoryId },
  })

  return res.status(200).json(data)
}

router.get('/', withPagination, tryCatch(getCategories))
router.get('/:categoryId', validateParams(paramsSchema), tryCatch(getCategory))
router.post('/', auth, validateBody(categorySchema), tryCatch(createCategory))
router.put(
  '/:categoryId',
  auth,
  validateParams(paramsSchema),
  validateBody(categorySchema),
  tryCatch(updateCategory),
)
router.delete('/:categoryId', auth, validateParams(paramsSchema), tryCatch(deleteCategory))

export default router
