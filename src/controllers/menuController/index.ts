import { NextFunction, Request, Response, Router } from 'express'

import prisma from 'prisma/connection'
import tryCatch from 'middlewares/tryCatch'

const router = Router()

const getMenu = async (req: Request, res: Response, next: NextFunction) => {
  const data = await prisma.category.findMany({
    include: { products: true },
    orderBy: { id: 'asc' },
  })

  return res.status(200).json(data)
}

router.get('/', tryCatch(getMenu))

export default router
