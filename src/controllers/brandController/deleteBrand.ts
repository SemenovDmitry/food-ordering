import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'

type IParams = {
  brandId: number
}

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { brandId } = req.params as unknown as IParams

  const data = await prisma.brand.delete({
    where: { id: brandId },
  })

  return res.status(200).json(data)
}

export default deleteBrand
