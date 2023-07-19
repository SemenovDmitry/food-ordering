import { Request, Response, Router } from 'express'

import prisma from 'prisma/connection'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany({ include: { products: true } })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
})

export default router
