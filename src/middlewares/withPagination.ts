import { NextFunction, Request, Response } from 'express'

import { DEFAULT_PAGE_SIZE } from 'consts/pagination'

type IPaginationQuery = {
  page?: string
  pageSize?: string
}

const ensurePaginatedNumbers = ({ page = '1', pageSize = DEFAULT_PAGE_SIZE.toString() }: IPaginationQuery) => {

  if (Number.isNaN(Number(page)) || Number.isNaN(Number(pageSize))) {
    throw new Error("Invalid page or page size");
  }

  return {
    page: Number(page),
    pageSize: Number(pageSize),
  }
}

const withPagination = (req: Request, res: Response, next: NextFunction) => {
  const pagination = ensurePaginatedNumbers(req.query)
  req.pagination = pagination
  return next();
}

export default withPagination
