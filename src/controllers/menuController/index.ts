import { NextFunction, Request, Response, Router } from 'express'

import prisma from 'prisma/connection'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.category.findMany({
      include: { products: true },
      orderBy: { id: 'asc' },
    })
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

export default router
