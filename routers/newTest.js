



// { 
//   {
//    "type": "ORDER",
//    "time": "Fri, 09 Dec 2011 11:48:13 ­0800",
//    "method": "create",
//    "mode": "auto",
//    "status": "In Production",
//    "status_code": "6",
//    "xid": "12345678",
//    "notes": "Special Instructions",
//    "shiplabel_url": "https://partner.com/ship?id=12345678",
//    "pack_url": "https://partner.com/receipt?id=12345678",
  
//    "giftnote_comment": "comment",
//    "shipping_carrier": "DHL",
//    "shipping_priority": "GROUND",
//    "shipping_account": "AG12345678",
//    "shipping_name": "ArtGun",
//    "shipping_address1": "16085 nw 52nd ave",
//    "shipping_address2": "Apt 100",
//    "shipping_city": "Miami Lakes",
//    "shipping_state": "FL",
//    "shipping_country": "US",
//    "shipping_zipcode": "33014",
//    "shipping_phone": "3059081777",
//    "shipping_email": "support@ArtGunmiami.com",
//    "billing_name": "ArtGun",
//    "billing_address1": "16085 nw 52nd ave",
//    "billing_address2": "Apt 100",
//    "billing_city": "Miami Lakes",
//    "billing_state": "FL",
//    "billing_country": "US",
//    "billing_zipcode": "33014",
//    "billing_phone": "3059081777",
//    "billing_email": "support@ArtGunmiami.com",
//    "items_quantity": "1",
//    "items_amount": "8.00",
//    "items_tax": "8.00",
//    "items": [
//    {
//      "name": "Blue Sky",
//      "sku": "10220201",
//      "quantity": "1",
//      "unit_amount": "8.00",
//      "subtotal_amount": "8.00",
//      "necklabel_binid": "156",
//      "hangtag_binid": "13",
//      "attributes": [
//      {
//        "type": "DigitalPrint",
//        "location": "CF",
//        "thumbnail": "http://partner.com/thumbnail.jpg",
//        "preview": "http://partner.com/preview.jpg",
//        "file_url": "https://partner.com/printimage",
//        "file_extension": "png",
//        "file_size": "330778",
//        "file_hash": "4c9ab9c2de80beecb1180d49",
//        "width" : "6",
//        "height": "8"
//      },
//      {
//        "type": "HeatTransfer",
//        "location": "FNL",
//        "thumbnail": "http://partner.com/thumbnail.jpg",
//        "preview": "http://partner.com/preview.jpg"
//      },
//      {
//        "type": "HangTag",
//        "location": "FN",
//        "thumbnail": "http://partner.com/thumbnail.jpg",
//        "preview": "http://partner.com/preview.jpg"
//      }
//      ]
//    }
//    ]
//  } 



//  var sampleShopifyJSON = {  
//    "id":123456,
//    "email":"jon@doe.ca",
//    "closed_at":null,
//    "created_at":"2016-08-18T21:58:49-04:00",
//    "updated_at":"2016-08-18T21:58:49-04:00",
//    "number":234,
//    "note":null,
//    "token":null,
//    "gateway":null,
//    "test":true,
//    "total_price":"24.99",
//    "subtotal_price":"14.99",
//    "total_weight":0,
//    "total_tax":"0.00",
//    "taxes_included":false,
//    "currency":"USD",
//    "financial_status":"voided",
//    "confirmed":false,
//    "total_discounts":"5.00",
//    "total_line_items_price":"19.99",
//    "cart_token":null,
//    "buyer_accepts_marketing":true,
//    "name":"#9999",
//    "referring_site":null,
//    "landing_site":null,
//    "cancelled_at":"2016-08-18T21:58:49-04:00",
//    "cancel_reason":"customer",
//    "total_price_usd":null,
//    "checkout_token":null,
//    "reference":null,
//    "user_id":null,
//    "location_id":null,
//    "source_identifier":null,
//    "source_url":null,
//    "processed_at":null,
//    "device_id":null,
//    "browser_ip":null,
//    "landing_site_ref":null,
//    "order_number":1234,
//    "discount_codes":[  

//    ],
//    "note_attributes":[  

//    ],
//    "payment_gateway_names":[  
//       "visa",
//       "bogus"
//    ],
//    "processing_method":"",
//    "checkout_id":null,
//    "source_name":"web",
//    "fulfillment_status":"pending",
//    "tax_lines":[  

//    ],
//    "tags":"",
//    "contact_email":"jon@doe.ca",
//    "order_status_url":null,
//    "line_items":[  
//       {  
//          "id":25803694211,
//          "variant_id":null,
//          "title":"Disney - Duck Tales 2",
//          "quantity":1,
//          "price":"0.00",
//          "grams":0,
//          "sku":"POD-10290101-DT2",
//          "variant_title":null,
//          "vendor":null,
//          "fulfillment_service":"manual",
//          "product_id":7983911363,
//          "requires_shipping":true,
//          "taxable":true,
//          "gift_card":false,
//          "name":"Disney - Duck Tales 2",
//          "variant_inventory_management":null,
//          "properties":[
//           {
//             "name": "image_url",
//             "value": "test_image_url_value"
//           }  

//          ],
//          "product_exists":true,
//          "fulfillable_quantity":1,
//          "total_discount":"0.00",
//          "fulfillment_status":null,
//          "tax_lines":[  

//          ]
//       },
//       {  
//          "id":19,
//          "variant_id":null,
//          "title":"Short Sleeve T-Shirt",
//          "quantity":1,
//          "price":"19.99",
//          "grams":454,
//          "sku":"POD-0001",
//          "variant_title":null,
//          "vendor":null,
//          "fulfillment_service":"manual",
//          "product_id":7983919043,
//          "requires_shipping":true,
//          "taxable":true,
//          "gift_card":false,
//          "name":"Short Sleeve T-Shirt",
//          "variant_inventory_management":null,
//          "properties":[  

//          ],
//          "product_exists":true,
//          "fulfillable_quantity":1,
//          "total_discount":"5.00",
//          "fulfillment_status":null,
//          "tax_lines":[  

//          ]
//       }
//    ],
//    "shipping_lines":[  
//       {  
//          "id":1234567,
//          "title":"Generic Shipping",
//          "price":"10.00",
//          "code":null,
//          "source":"shopify",
//          "phone":null,
//          "requested_fulfillment_service_id":null,
//          "delivery_category":null,
//          "carrier_identifier":null,
//          "tax_lines":[  

//          ]
//       }
//    ],
//    "billing_address":{  
//       "first_name":"Bob",
//       "address1":"123 Billing Street",
//       "phone":"555-555-BILL",
//       "city":"Billtown",
//       "zip":"K2P0B0",
//       "province":"Kentucky",
//       "country":"United States",
//       "last_name":"Biller",
//       "address2":null,
//       "company":"My Company",
//       "latitude":null,
//       "longitude":null,
//       "name":"Bob Biller",
//       "country_code":"US",
//       "province_code":"KY"
//    },
//    "shipping_address":{  
//       "first_name":"Steve",
//       "address1":"123 Shipping Street",
//       "phone":"555-555-SHIP",
//       "city":"Shippington",
//       "zip":"K2P0S0",
//       "province":"Kentucky",
//       "country":"United States",
//       "last_name":"Shipper",
//       "address2":null,
//       "company":"Shipping Company",
//       "latitude":null,
//       "longitude":null,
//       "name":"Steve Shipper",
//       "country_code":"US",
//       "province_code":"KY"
//    },
//    "fulfillments":[  

//    ],
//    "refunds":[  

//    ],
//    "customer":{  
//       "id":1234567,
//       "email":"john@test.com",
//       "accepts_marketing":false,
//       "created_at":null,
//       "updated_at":null,
//       "first_name":"John",
//       "last_name":"Smith",
//       "orders_count":0,
//       "state":"disabled",
//       "total_spent":"0.00",
//       "last_order_id":null,
//       "note":null,
//       "verified_email":true,
//       "multipass_identifier":null,
//       "tax_exempt":false,
//       "tags":"",
//       "last_order_name":null,
//       "default_address":{  
//          "id":1234567,
//          "first_name":null,
//          "last_name":null,
//          "company":null,
//          "address1":"123 Elm St.",
//          "address2":null,
//          "city":"Ottawa",
//          "province":"Ontario",
//          "country":"Canada",
//          "zip":"K2H7A8",
//          "phone":"123-123-1234",
//          "name":"",
//          "province_code":"ON",
//          "country_code":"CA",
//          "country_name":"Canada",
//          "default":false
//       }
//    }
// };




// { {         
//   "type": "ORDER",
//   "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
//   "method": "create",
//   "mode": "debug",
//   "status": "In Production",
//   "status_code": "6",
//   "xid": "TEST0001",
//   "notes": "Hybrid Order Test",
//   "shiplabel_url": "",
//   "pack_url": "",
//   "giftnote_comment": "",
//   "shipping_carrier": "MI",
//   "shipping_priority": "4272",
//   "shipping_account": "",
//   "shipping_name": "Avery Ma",
//   "shipping_address1": "5757 Plaza Dr",
//   "shipping_address2": "Ste 250",
//   "shipping_city": "Cypress",
//   "shipping_state": "CA",
//   "shipping_country": "US",
//   "shipping_zipcode": "90630",
//   "shipping_phone": "7142432538",
//   "shipping_email": "ama@hybridapparel.com",
//   "billing_name": "Avery Ma",
//   "billing_address1": "5757 Plaza Dr",
//   "billing_address2": "Ste 250",
//   "billing_city": "Cypress",
//   "billing_state": "CA",
//   "billing_country": "US",
//   "billing_zipcode": "90630",
//   "billing_phone": "7142432538",
//   "billing_email": "ama@hybridapparel.com",
//   "items_quantity": "1",
//   "items_amount": "",
//   "items_tax": "",
//   "items": [{
//     "name": "Test Art ",          
//     "sku": "10220201",           
//     "quantity": "1",    
//     "unit_amount": "",            
//     "subtotal_amount": "",     
//     "necklabel_binid": "",       
//     "hangtag_binid": "",         
//     "attributes": [      
//     {           
//       "type": "DigitalPrint",
//       "location": "CF",
//       "thumbnail": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
//       "preview": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
//       "file_url": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
//       "file_extension": "png",
//       "file_size": "",
//       "file_hash": "",
//       "width" : "6",
//       "height": "8"
//     }
//     ]           
//   }           
//   ]           
// };


// {}

// {         
//   "type": "ORDER",
//   "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
//   "method": "create",
//   "mode": "debug",
//   "status": "In Production",
//   "status_code": "6",
//   "xid": "TEST0010",
//   "notes": "Hybrid Order Test",
//   "shiplabel_url": "",
//   "pack_url": "",
//   "giftnote_comment": "",
//   "shipping_carrier": "MI",
//   "shipping_priority": "4272",
//   "shipping_account": "",
//   "shipping_name": "Avery Ma",
//   "shipping_address1": "5757 Plaza Dr",
//   "shipping_address2": "Ste 250",
//   "shipping_city": "Cypress",
//   "shipping_state": "CA",
//   "shipping_country": "US",
//   "shipping_zipcode": "90630",
//   "shipping_phone": "7142432538",
//   "shipping_email": "ama@hybridapparel.com",
//   "items_quantity": "1",
//   "items_amount": "",
//   "items_tax": "",
//   "items": [{
//     "name": "Test Art ",          
//     "sku": "10290403",           
//     "quantity": "1",    
//     "unit_amount": "",            
//     "subtotal_amount": "",     
//     "necklabel_binid": "",       
//     "hangtag_binid": "",         
//     "attributes": [      
//     {           
//       "type": "DigitalPrint",
//       "location": "CF",
//       "thumbnail": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "preview": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "file_url": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "file_extension": "png"
//     }
//     ]           
//   }           
//   ]           
// }

// parses shopify webhook JSON and creates new ArtGun order object
// var shopifyWebhookParser = function(webhookJSON){
//   var artGunJSON = {};
//   var totalQuantity = 0;
//   for (var i=0; i<webhookJSON.line_items.length; i++) {
//     var lineItem           = {};
//     var lineItems          = [];
//     var lineItemAttribute  = {};
//     var lineItemAttributes = [];
//     if (webhookJSON.line_items[i].sku.indexOf("POD") != -1) {
//       totalQuantity = totalQuantity + parseInt(webhookJSON.line_items[i].quantity);
//       lineItem.name = webhookJSON.line_items[i].title;
//       lineItem.sku                = webhookJSON.line_items[i].sku;
//       lineItem.quantity           = parseInt(webhookJSON.line_items[i].quantity);
//       lineItem.unit_amount        = parseInt(webhookJSON.line_items[i].price);
//       lineItem.subtotal_amount    = (lineItem.quantity * lineItem.unit_amount);
//       lineItem.necklabel_binid    = "";
//       lineItem.hangtag_binid      = "";
//       lineItemAttribute.type      = "DigitalPrint";
//       lineItemAttribute.location  = "CF";
//       lineItemAttribute.thumbnail = webhookJSON.line_items[i].properties[0].value;
//       lineItemAttribute.preview   = webhookJSON.line_items[i].properties[0].value;
//       lineItemAttribute.file_url  = webhookJSON.line_items[i].properties[0].value;
//       lineItemAttribute.file_extension = "png";
//       lineItemAttributes.push(lineItemAttribute);
//       lineItem.attributes = lineItemAttributes;
//       lineItems.push(lineItem);
//     };
//   };
//   artGunJSON.type = "order";
//   artGunJSON.time = webhookJSON.created_at;
//   artGunJSON.method = "create";
//   artGunJSON.mode = "debug";
//   artGunJSON.status = "In Production";
//   artGunJSON.status_code = "6";
//   artGunJSON.xid = webhookJSON.name;
//   artGunJSON.notes = webhookJSON.note;
//   artGunJSON.shiplabel_url = "";
//   artGunJSON.pack_url = "";
//   artGunJSON.giftnote_comment = null;
//   artGunJSON.shipping_carrier = null;
//   artGunJSON.shipping_priority = webhookJSON.shipping_lines[0].title;
//   artGunJSON.shipping_account = null;
//   artGunJSON.shipping_name = webhookJSON.shipping_address.first_name + " " + webhookJSON.shipping_address.last_name;
//   artGunJSON.shipping_address1 = webhookJSON.shipping_address.address1;
//   artGunJSON.shipping_address2 = webhookJSON.shipping_address.address2;
//   artGunJSON.shipping_city = webhookJSON.shipping_address.city;
//   artGunJSON.shipping_state = webhookJSON.shipping_address.province;
//   artGunJSON.shipping_country = webhookJSON.shipping_address.country;
//   artGunJSON.shipping_zipcode = webhookJSON.shipping_address.zip;
//   artGunJSON.shipping_phone = webhookJSON.shipping_address.phone;
//   artGunJSON.shipping_email = webhookJSON.email;
//   artGunJSON.items_quantity = totalQuantity;
//   artGunJSON.items_amount = webhookJSON.subtotal_price;
//   artGunJSON.items_tax = webhookJSON.total_tax;
//   artGunJSON.items = lineItems;
//   return artGunJSON;
// };

// test order JSON for ArtGun

// var hybridTestOrder = {         
//   "type": "ORDER",
//   "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
//   "method": "create",
//   "mode": "debug",
//   "status": "In Production",
//   "status_code": "6",
//   "xid": "TEST0004",
//   "notes": "Hybrid Order Test",
//   "shiplabel_url": "",
//   "pack_url": "",
//   "giftnote_comment": "",
//   "shipping_carrier": "MI",
//   "shipping_priority": "4272",
//   "shipping_account": "",
//   "shipping_name": "Avery Ma",
//   "shipping_address1": "5757 Plaza Dr",
//   "shipping_address2": "Ste 250",
//   "shipping_city": "Cypress",
//   "shipping_state": "CA",
//   "shipping_country": "US",
//   "shipping_zipcode": "90630",
//   "shipping_phone": "7142432538",
//   "shipping_email": "ama@hybridapparel.com",
//   "items_quantity": "1",
//   "items_amount": "",
//   "items_tax": "",
//   "items": [{
//     "name": "Test Art ",          
//     "sku": "10290403",           
//     "quantity": "1",    
//     "unit_amount": "",            
//     "subtotal_amount": "",     
//     "necklabel_binid": "",       
//     "hangtag_binid": "",         
//     "attributes": [      
//     {           
//       "type": "DigitalPrint",
//       "location": "CF",
//       "thumbnail": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "preview": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "file_url": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
//       "file_extension": "png"
//     }
//     ]           
//   }           
//   ]           
// };

// create native order JSON to test SHA1 hash against one ArtGun provided

// var hybridBasicTestOrderObject = {"type":"ORDER"}; 

// creates signature used in ArtGun API calls

// var artGunSig = function (orderObject) {
//   sha1(artGunSecret + "7611759cca374078933a55a2f3c836bf" + JSON.stringify(orderObject));
// }

// concatenates the ArtGun Key, order JSON, and computed ArtGun signature

// var artGunPostBody = "Key=7611759cca374078933a55a2f3c836bf" + "&data=" + JSON.stringify(hybridTestOrder) + "&signature=" + artGunSig;
         



// var testNewJSON = {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "Fri, 30 Sep 2016 11:48:13 ­0600",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "ABC123",
//     "notes": "Hybrid Order Test",
//     "shiplabel_url": "",
//     "pack_url": "",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Joe Foo",
//     "billing_address1": "123 Main Street",
//     "billing_address2": "Apt 3",
//     "billing_city": "Anytown",
//     "billing_state": "NY",
//     "billing_country": "US",
//     "billing_zipcode": "11221",
//     "shipping_name": "Joe Foo",
//     "shipping_address1": "123 Main Street",
//     "shipping_address2": "Apt 3",
//     "shipping_city": "Anytown",
//     "shipping_state": "NY",
//     "shipping_country": "US",
//     "shipping_zipcode": "11221",
//     "shipping_phone": "8471231234",
//     "shipping_email": "joe.foo@bar.com",
//     "items_quantity": "1",
//     "items_amount": "1.50",
//     "lineItemTotal": "1.50",
//     "merchandiseTotal": "3.00",
//     "shippingCharge": "0.00",
//     "cardType": "AMEX",
//     "cardDigits": "4321",
//     "items_tax": "0.05",
//     "orderTotal": "3.05",
//     "items": [{
//       "name": "Bacon",          
//       "sku": "10290403",
//       "UPC": "111111111111UPC",           
//       "quantity": "1",    
//       "unit_amount": "1.50",            
//       "subtotal_amount": "1.50",
//       "lineItemTotal": "1.50",  
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
//         "file_extension": "png"
//       },
//       {
//        "type": "HangTag",
//        "location": "FN",
//        "thumbnail": "http://partner.com/thumbnail.jpg",
//        "preview": "http://partner.com/preview.jpg"
//      }
//      ]           
//    },
//    {
//     "name": "More Bacon",          
//     "sku": "10290404",
//     "UPC": "2222222222UPC",           
//     "quantity": "1",    
//     "unit_amount": "1.50",            
//     "subtotal_amount": "1.50",
//     "lineItemTotal": "1.50",    
//     "necklabel_binid": "",       
//     "hangtag_binid": "",         
//     "attributes": [      
//     {           
//       "type": "DigitalPrint",
//       "location": "CF",
//       "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
//       "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
//       "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
//       "file_extension": "png"
//     },
//     {           
//       "type": "DigitalPrint",
//       "location": "FB",
//       "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
//       "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
//       "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
//       "file_extension": "png"
//     },
//     {
//      "type": "HangTag",
//      "location": "FN",
//      "thumbnail": "http://partner.com/thumbnail.jpg",
//      "preview": "http://partner.com/preview.jpg"
//    }
//    ]           
//  }]         
// },
// "OrderID":"ABC123",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "07175c00ab32c2e4c4c547b3d4fd52d8d6d9dc7e"
// };


// var testOrder1 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0900",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0900/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Andrew Carton",
//     "billing_address1": "960 Willoughby Ave",
//     "billing_address2": "Apt 3F",
//     "billing_city": "Brooklyn",
//     "billing_state": "NY",
//     "billing_country": "US",
//     "billing_zipcode": "11221",
//     "shipping_name": "Andrew Carton",
//     "shipping_address1": "960 Willoughby Ave",
//     "shipping_address2": "Apt 3F",
//     "shipping_city": "Brooklyn",
//     "shipping_state": "NY",
//     "shipping_country": "US",
//     "shipping_zipcode": "11221",
//     "shipping_phone": "8473220990",
//     "shipping_email": "andrew.carton1@gmail.com",
//     "items_quantity": "1",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "PRISM FLOCK",          
//       "sku": "10290103",
//       "UPC": "190344757828",           
//       "quantity": "2",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "30.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PRINT.png",
//         "file_extension": "png"
//       }
//      ]           
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "932013322",
// "brand": "11",
// "returnCode": "SW",
// "OrderID":"MACYS0900",
// "PONumber": "46084695",
// "coBillingName": "",
// "coShippingName": "",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "reservationNumber": "932013322",
// "signature": "58a045d7de31e804211a729312fc46c5db44d616"
// };



// var testOrder1 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0900",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0800/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "Hybrid Apparel",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "Hybrid Apparel",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8473220990",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "PRISM FLOCK",          
//       "sku": "10290102",
//       "UPC": "190344757828",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PF368V2C_PRINT.png",
//         "file_extension": "png"
//       }
//      ]           
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "932013322",
// "brand": "11",
// "returnCode": "SW",
// "OrderID":"PROD0500",
// "PONumber": "46084695",
// "coBillingName": "",
// "coShippingName": "",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "reservationNumber": "932013322",
// "signature": "58a045d7de31e804211a729312fc46c5db44d616"
// };


// var testOrder2 = {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0801",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0801/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8473220990",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "LIVIN ON",          
//       "sku": "10291002",
//       "UPC": "190344757729",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2BJM0010V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2BJM0010V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PRINT.png",
//         "file_extension": "png"
//       }
//      ]           
//    }]
//  },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "1234",
// "barcodeValue": "932013323",
// "brand": "11",
// "returnCode": "SW",
// "coBillingName": "",
// "coShippingName": "",
// "OrderID":"PROD0501",
// "PONumber": "46084694",
// "reservationNumber": "932013323",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "9ed27f606a933021c0f42953eb74076c0d327099"
// };

// var testOrder3 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "Thurs, 22 Dec 2016 11:48:13 ­0600",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0802",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "Hybrid Apparel",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "Hybrid Apparel",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8471231234",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "St Partys Day",          
//       "sku": "10290102",
//       "UPC": "444444444444",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-9788.png?16454377556678490292",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-9788.png?16454377556678490292",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-9788_FPO-01.png?16454377556678490292",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-9788.png?16454377556678490292",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-9788.png?16454377556678490292",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-9788_FPO-01.png?16454377556678490292",
//         "file_extension": "png"
//       }
//      ]           
   
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "PROD0502",
// "brand": "11",
// "returnCode": "SW",
// "OrderID":"PROD0502",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "75867a87da5a55267a88ac533f71456a0358297a"
// };

// var testOrder4 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0803",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0803/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8473220990",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "HASHTAG CHEERS",          
//       "sku": "10292402",
//       "UPC": "190344757620",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/1WRD9784V2C_PRINT.png",
//         "file_extension": "png"
//       }
//      ]           
   
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "932013324",
// "brand": "11",
// "returnCode": "SW",
// "coBillingName": "",
// "coShippingName": "",
// "OrderID":"PROD0503",
// "PONumber": "46084693",
// "reservationNumber": "932013324",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "a9b6e1b394e165d0fb0d8a5ae568e8658a4ef671"
// };

// var testOrder5 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0804",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0804/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8473220990",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "MICKEY SHAMROCK",          
//       "sku": "10290202",
//       "UPC": "190344757774",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2DNY3319V2C_PRINT.png",
//         "file_extension": "png"
//       }
//      ]           
   
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "932013325",
// "brand": "11",
// "returnCode": "SW",
// "coBillingName": "",
// "coShippingName": "",
// "OrderID":"MACYS12345",
// "PONumber": "46084691",
// "reservationNumber": "932013325",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "ec437a5567ddb3d07d30c09a0cc4e29f97c5287d"
// };

// var testOrder6 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "01/23/2016 12:00:00 AM",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0805",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "https://tranquil-fortress-90513.herokuapp.com/tsc/orders/PROD0805/packslip",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8473220990",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "KISS ME",          
//       "sku": "10291002",
//       "UPC": "190344757873",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_PRINT.png",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_THUMB.png",
//         "preview": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_PREVIEW.png",
//         "file_url": "https://s3-us-west-2.amazonaws.com/hybridapparel/Product/Macys/2PNT0966V2C_PRINT.png",
//         "file_extension": "png"
//       }
//       ]           
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "932013326",
// "orderID":"PROD0805",
// "returnCode": "SW",
// "coBillingName": "",
// "coShippingName": "",
// "brand": "11",
// "PONumber": "46084692",
// "reservationNumber": "932013326",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "94b74c0001d910980a1e001474f374c6bf7aee5a"
// };










// var testOrder60 = 
// {
//   "orderJSON":{        
//     "type": "ORDER",
//     "time": "Fri, 06 Jan 2016 11:48:13 ­0600",
//     "method": "create",
//     "mode": "auto",
//     "status": "In Production",
//     "status_code": "6",
//     "xid": "PROD0525",
//     "notes": "Hybrid Order",
//     "shiplabel_url": "",
//     "pack_url": "",
//     "giftnote_comment": "",
//     "shipping_carrier": "MI",
//     "shipping_priority": "4272",
//     "shipping_account": "",
//     "billing_name": "Lora Lozano",
//     "billing_address1": "10711 Walker St",
//     "billing_address2": "Hybrid Apparel",
//     "billing_city": "Cypress",
//     "billing_state": "CA",
//     "billing_country": "US",
//     "billing_zipcode": "90630",
//     "shipping_name": "Lora Lozano",
//     "shipping_address1": "10711 Walker St",
//     "shipping_address2": "Hybrid Apparel",
//     "shipping_city": "Cypress",
//     "shipping_state": "CA",
//     "shipping_country": "US",
//     "shipping_zipcode": "90630",
//     "shipping_phone": "8471231234",
//     "shipping_email": "ama@hybridapparel.com",
//     "items_quantity": "6",
//     "items_amount": "90.00",
//     "items_tax": "0.05",
//     "items": [{
//       "name": "Kiss Me Im Irish",          
//       "sku": "10291002",
//       "UPC": "1111111111",           
//       "quantity": "6",    
//       "unit_amount": "15.00",            
//       "subtotal_amount": "90.00",
//       "necklabel_binid": "",       
//       "hangtag_binid": "",         
//       "attributes": [      
//       {           
//         "type": "DigitalPrint",
//         "location": "CF",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_PNT-0966.png?16454377556678490292",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_PNT-0966.png?16454377556678490292",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/PNT-0966_FPO-01.png?16454377556678490292",
//         "file_extension": "png"
//       },
//       {           
//         "type": "DigitalPrint",
//         "location": "FB",
//         "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_PNT-0966.png?16454377556678490292",
//         "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_PNT-0966.png?16454377556678490292",
//         "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/PNT-0966_FPO-01.png?16454377556678490292",
//         "file_extension": "png"
//       }
//       ]           
//  }]         
// },
// "shippingCharge": "5.00",
// "cardType": "AMEX",
// "cardDigits": "4321",
// "barcodeValue": "PROD0525",
// "orderID":"PROD0525",
// "returnCode": "SW",
// "coBillingName": "",
// "coShippingName": "",
// "brand": "11",
// "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
// "signature": "f2b10e07dadd9b9569e066860d12b8b2f4a9c107"
// };


// var tscController = {
//   var self = this;
//   var resJSON = {};
//   var options = {};
//   makeTscSig: function(data) {
//     return sha1(TSCSecret + TSCKey + data);
//   },
//   authTscReq: function(TSCReq) {
//     if (self.makeTscSig(TSCReq.data) !== TSCReq.signature) {
//       console.log('Vendor req not accepted - invalid credentials and signature');
//       return false;
//     } else if (self.makeTscSig(TSCReq.data) == TSCReq.signature) {
//       console.log('valid credentials - processing request');
//       return true;
//     };
//   },
//   persistTscOrderRes: function (TSCRes) {
//     var isProcessedBool;
//     var logMessage = "";
//     if (TSCRes.res == "success") {
//       isProcessedBool = true;
//       logMessage = 'TSC success res to db is ...  ' + JSON.stringify(TSCRes);
//     } else if (TSCRes.res == "error") {
//       isProcessedBool = false;
//       logMessage = 'TSC error res to db is ...  ' + JSON.stringify(TSCRes);
//     };
//     Order.findOne({
//       where:{OrderID: TSCRes.xid}
//     }).then(function (order) {
//       console.log('TSC res to db is ...  ' + JSON.stringify(TSCRes));
//       order.update({
//         EndpointResponseID: TSCRes.receipt_id,
//         EndpointResponseBody: TSCRes,
//         isProcessed: isProcessedBool
//       }).then(function () {
//         return console.log('new TSC res persisted');
//       });
//     })
//   },
//   tscPostReq: function (url, postData, callback) {
//     var postBody = {};
//     var postSig = self.makeTscSig(postData);
//     postBody.key = TSCKey;
//     postBody.signature = sig;
//     postBody.data = postData;
//     options = { 
//       method: 'POST',
//       url: url,
//       headers: 
//       { 'cache-control': 'no-cache',
//         'content-type': 'application/json' },
//       body: postBody
//     };
//     request(options, function (error, response, body) {
//       var TSCResBody = response.body;
//       if (url == 'http://apptest.tscmiami.com/api/order/create') {self.persistTscOrderRes(TSCResBody)};

//     });
//   },
  


// };

// var esbController = {};

// var hybridController = {};





