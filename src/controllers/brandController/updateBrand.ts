import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'

type IParams = {
  brandId: number
}

const updateBrand =  async (req: Request, res: Response, next: NextFunction) => {
  const { brandId } = req.params as unknown as IParams
  const brand = req.body

  const data = await prisma.brand.update({
    where: { id: brandId },
    data: brand,
  })
  
  return res.status(201).json(data)
}

export default updateBrand
