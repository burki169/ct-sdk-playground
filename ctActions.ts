import {
  ProductAddVariantAction,
  ProductRemoveVariantAction,
  ProductVariant,
} from "@commercetools/platform-sdk";
import { UNQ_ATTRIBUTE_NAME } from "./ctpClient";
import { generateVariantKey } from "./funcs";
import { randomUUID } from "crypto";

export const createRemoveVariantActions = (variants: ProductVariant[]): ProductRemoveVariantAction[] =>
  variants.map(
    (v) =>
      ({ action: "removeVariant", id: v.id }) as ProductRemoveVariantAction,
  );

export const createAddVariantActions = (masterVariant:ProductVariant, variantCount:number):ProductAddVariantAction[] => {
  if(!masterVariant || !masterVariant.attributes)
    return [];

  const masterAttributes = masterVariant.attributes.filter(
    (attr) => attr.name !== UNQ_ATTRIBUTE_NAME,
  );
    
  return [...Array(variantCount).keys()].map( element => {
    const key = generateVariantKey();  
    return {
      action: "addVariant",
      key,
      sku: `${key}-sku`,
      prices: masterVariant.prices,
      attributes: [
        ...masterAttributes,
        {
          name: UNQ_ATTRIBUTE_NAME,
          value: randomUUID(),
        },
      ],
    } as ProductAddVariantAction;
  });
}
