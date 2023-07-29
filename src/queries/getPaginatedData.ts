import { Prisma } from '@prisma/client'

import prisma from 'prisma/connection'
import { IWithPagination } from 'types/models'

type IGetPaginatedDataParams = {
  modelName: 'category' | 'brand' // | 'product' (error)
  pagination: IWithPagination
  orderBy?: 'asc' | 'desc'
}

// NOTE: not works with models with different fields
async function getPaginatedData({ modelName, pagination, orderBy }: IGetPaginatedDataParams) {
  const { page, pageSize } = pagination

  const skip = (page - 1) * pageSize
  const take = pageSize

  const [data, count] = await prisma.$transaction([
    prisma[modelName].findMany({
      take,
      skip,
      orderBy: {
        id: orderBy,
      },
    }),
    prisma[modelName].count(),
  ])

  const totalPages = Math.ceil(count / pageSize)

  return {
    meta: {
      count,
      totalPages,
    },
    data,
  }
}

export default getPaginatedData
