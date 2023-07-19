import { Request, Response, Router } from 'express'
import { object, string } from 'zod'

import prisma from 'prisma/connection'
import useBodyValidator from 'utils/useBodyValidator'

const productSchema = object({
  name: string().min(3),
})

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany({ include: { brand: true, category: true } })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:productId', async (req: Request, res: Response) => {
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
    return res.status(500).json({ error: 'Server error' })
  }
})

router.post(
  '/',
  useBodyValidator(productSchema),
  async (req: Request, res: Response) => {
    const product = req.body

    try {
      const data = await prisma.product.create({
        data: product,
        include: { brand: true, category: true },
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Server error' })
    }
  },
)

router.put(
  '/:productId',
  useBodyValidator(productSchema),
  async (req: Request, res: Response) => {
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
      return res.status(500).json({ error: 'Server error' })
    }
  },
)

router.delete('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params

  try {
    const data = await prisma.product.delete({
      where: { id: Number(productId) },
      include: { brand: true, category: true },
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
