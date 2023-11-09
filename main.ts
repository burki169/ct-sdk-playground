import { PRODUCT_KEY,  ctApiClient } from "./ctpClient";
import { createAddVariantActions, createRemoveVariantActions } from "./ctActions";


ctApiClient
  .products()
  .withKey({ key: PRODUCT_KEY })
  .get()
  .execute()
  .then(async (product) => {
    
    if(!product || !product.body) return
    console.log(`${JSON.stringify(product.body).length}`);
    
    let productVersion = product?.body?.version;
    let currentData = product.body.masterData?.current;
    const masterVariant = currentData?.masterVariant;
    
    if (!masterVariant || !masterVariant.attributes) return;

    // Remove all variants
    let response = await ctApiClient
      .products()
      .withKey({ key: PRODUCT_KEY })
      .post({
        body: {
          actions: [...createRemoveVariantActions(currentData.variants)],
          version: productVersion,
        },
      })
      .execute();

    productVersion = response.body.version;
    
    // Add some random variants
    
    response = await ctApiClient
        .products()
        .withKey({ key: PRODUCT_KEY })
        .post({
          body: {
            actions: [...createAddVariantActions(masterVariant,10)],
            version: productVersion,
          },
        })
        .execute();
      productVersion = response.body.version;
  });
