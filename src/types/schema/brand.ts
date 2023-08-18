import * as z from "zod"
import { CompleteProduct, RelatedProductModel } from "./index"

export const BrandModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteBrand extends z.infer<typeof BrandModel> {
  products: CompleteProduct[]
}

/**
 * RelatedBrandModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBrandModel: z.ZodSchema<CompleteBrand> = z.lazy(() => BrandModel.extend({
  products: RelatedProductModel.array(),
}))
