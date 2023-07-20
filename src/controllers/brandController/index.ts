import { NextFunction, Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import useBodyValidator from 'utils/useBodyValidator'

const brandSchema = object({
  name: string().min(3),
})

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.brand.findMany()
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:brandId', async (req: Request, res: Response, next: NextFunction) => {
  const { brandId } = req.params as { brandId: string }

  try {
    const data = await prisma.brand.findFirst({
      where: { id: Number(brandId) },
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
  useBodyValidator(brandSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const brand = req.body

    try {
      const data = await prisma.brand.create({ data: brand })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.put(
  '/:brandId',
  useBodyValidator(brandSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { brandId } = req.params
    const brand = req.body

    try {
      const data = await prisma.brand.update({
        where: { id: Number(brandId) },
        data: brand,
      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
)

router.delete('/:brandId', async (req: Request, res: Response, next: NextFunction) => {
  const { brandId } = req.params

  try {
    const data = await prisma.brand.delete({
      where: { id: Number(brandId) },
    })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

export default router
