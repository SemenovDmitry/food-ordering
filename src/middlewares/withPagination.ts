import { NextFunction, Request, Response } from 'express'

import { DEFAULT_PAGE_SIZE } from 'consts/pagination'

type IPaginationQuery = {
  page?: string
  pageSize?: string
}

const MAX_PAGE_SIZE = 50

const ensurePaginatedNumbers = ({
  page = '1',
  pageSize = DEFAULT_PAGE_SIZE.toString(),
}: IPaginationQuery) => {
  if (Number.isNaN(Number(page)) || Number.isNaN(Number(pageSize))) {
    throw new Error('Invalid page or page size')
  }

  if (Number(pageSize) > MAX_PAGE_SIZE) {
    throw new Error('Max page size')
  }

  return {
    page: Number(page),
    pageSize: Number(pageSize),
  }
}

const withPagination = (req: Request, res: Response, next: NextFunction) => {
  req.pagination = ensurePaginatedNumbers(req.query)
  return next()
}

export default withPagination
