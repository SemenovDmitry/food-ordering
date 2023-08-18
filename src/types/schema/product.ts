import * as z from "zod"
import { CompleteBrand, RelatedBrandModel, CompleteCategory, RelatedCategoryModel } from "./index"

export const ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
  brandId: z.number().int().nullish(),
  categoryId: z.number().int().nullish(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  brand?: CompleteBrand | null
  category?: CompleteCategory | null
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  brand: RelatedBrandModel.nullish(),
  category: RelatedCategoryModel.nullish(),
}))
