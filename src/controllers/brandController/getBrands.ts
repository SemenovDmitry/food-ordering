import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'

const getBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { page, pageSize } = req.pagination

  const skip = (page - 1) * pageSize
  const take = pageSize

  const [data, count] = await prisma.$transaction([
    prisma.brand.findMany({
      take,
      skip,
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.brand.count(),
  ])

  const totalPages = Math.ceil(count / pageSize)

  const response = {
    meta: {
      count,
      totalPages,
    },
    data,
  }

  return res.status(200).json(response)
}

export default getBrands
