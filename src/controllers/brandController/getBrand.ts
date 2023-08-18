import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'

type IGetBrandParams = {
  brandId: number
}

const getBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { brandId } = req.params as unknown as IGetBrandParams

  const data = await prisma.brand.findFirst({
    where: { id: brandId },
  })

  if (!data) {
    return res.status(404).json({ error: 'Not found' })
  }

  return res.status(200).json(data)
}

export default getBrand
