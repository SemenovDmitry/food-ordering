import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const brand = req.body

  const data = await prisma.brand.create({ data: brand })
  
  return res.status(201).json(data)
}

export default createBrand
