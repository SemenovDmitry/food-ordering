import prisma from "prisma/connection"
import { IWithPagination } from "types/models"

async function getPaginatedProducts({ page, pageSize }: IWithPagination) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  const [data, count] = await prisma.$transaction([
    prisma.product.findMany({
      take,
      skip,
      include: { brand: true, category: true },
      orderBy: { id: 'asc' },
    }),
    prisma.product.count(),
  ])

  const totalPages = Math.ceil(count / pageSize)

  return {
    data,
    meta: {
      count,
      totalPages,
    },
  }
}

export default getPaginatedProducts
