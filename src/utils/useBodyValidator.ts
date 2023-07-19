import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError, ZodIssue } from 'zod'
import util from 'util'

const inspect = (item: any) => {
  console.log(util.inspect(item, { depth: null }))
}

const useBodyValidator =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req

    try {
      await schema.parseAsync(body)
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(error.format())
      }

      return res.status(500).send({ error: 'Server error' })
    }
  }

export default useBodyValidator

// const test = () => {
//   const transformedErrors = error.errors.map(({ path, message }) => {
//     console.log('{ path, message } :>> ', { path, message });
//     const next = path.reduce((acc, item) => {
//       if (typeof item === 'number') {
//         return `${acc}[${item}]`
//       }
//       if (!acc) return item
//       return `${acc}.${item}`

//     }, '')

//     return { [next]: message };
//   });

//   console.log('object :>> ', inspect(transformedErrors));

//   const test = error.format();
//   const test2 = error.flatten((issue: ZodIssue) => ({
//     path: issue.path,
//     message: issue.message,
//   }));
//   // inspect(test2);
// }
