import { Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import useBodyValidator from 'utils/useBodyValidator'

const categorySchema = object({
  name: string().min(3),
})

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:categoryId', async (req: Request, res: Response) => {
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
    return res.status(500).json({ error: 'Server error' })
  }
})

router.post(
  '/',
  useBodyValidator(categorySchema),
  async (req: Request, res: Response) => {
    const category = req.body

    try {
      const data = await prisma.category.create({ data: category })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Server error' })
    }
  },
)

router.put(
  '/:categoryId',
  useBodyValidator(categorySchema),
  async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const category = req.body

    try {
      const data = await prisma.category.update({
        where: { id: Number(categoryId) },
        data: category,
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Server error' })
    }
  },
)

router.delete('/:categoryId', async (req: Request, res: Response) => {
  const { categoryId } = req.params

  try {
    const data = await prisma.category.delete({
      where: { id: Number(categoryId) },
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
