
{ 
  {
   "type": "ORDER",
   "time": "Fri, 09 Dec 2011 11:48:13 ­0800",
   "method": "create",
   "mode": "auto",
   "status": "In Production",
   "status_code": "6",
   "xid": "12345678",
   "notes": "Special Instructions",
   "shiplabel_url": "https://partner.com/ship?id=12345678",
   "pack_url": "https://partner.com/receipt?id=12345678",
  
   "giftnote_comment": "comment",
   "shipping_carrier": "DHL",
   "shipping_priority": "GROUND",
   "shipping_account": "AG12345678",
   "shipping_name": "ArtGun",
   "shipping_address1": "16085 nw 52nd ave",
   "shipping_address2": "Apt 100",
   "shipping_city": "Miami Lakes",
   "shipping_state": "FL",
   "shipping_country": "US",
   "shipping_zipcode": "33014",
   "shipping_phone": "3059081777",
   "shipping_email": "support@ArtGunmiami.com",
   "billing_name": "ArtGun",
   "billing_address1": "16085 nw 52nd ave",
   "billing_address2": "Apt 100",
   "billing_city": "Miami Lakes",
   "billing_state": "FL",
   "billing_country": "US",
   "billing_zipcode": "33014",
   "billing_phone": "3059081777",
   "billing_email": "support@ArtGunmiami.com",
   "items_quantity": "1",
   "items_amount": "8.00",
   "items_tax": "8.00",
   "items": [
   {
     "name": "Blue Sky",
     "sku": "10220201",
     "quantity": "1",
     "unit_amount": "8.00",
     "subtotal_amount": "8.00",
     "necklabel_binid": "156",
     "hangtag_binid": "13",
     "attributes": [
     {
       "type": "DigitalPrint",
       "location": "CF",
       "thumbnail": "http://partner.com/thumbnail.jpg",
       "preview": "http://partner.com/preview.jpg",
       "file_url": "https://partner.com/printimage",
       "file_extension": "png",
       "file_size": "330778",
       "file_hash": "4c9ab9c2de80beecb1180d49",
       "width" : "6",
       "height": "8"
     },
     {
       "type": "HeatTransfer",
       "location": "FNL",
       "thumbnail": "http://partner.com/thumbnail.jpg",
       "preview": "http://partner.com/preview.jpg"
     },
     {
       "type": "HangTag",
       "location": "FN",
       "thumbnail": "http://partner.com/thumbnail.jpg",
       "preview": "http://partner.com/preview.jpg"
     }
     ]
   }
   ]
 } 



 var sampleShopifyJSON = {  
   "id":123456,
   "email":"jon@doe.ca",
   "closed_at":null,
   "created_at":"2016-08-18T21:58:49-04:00",
   "updated_at":"2016-08-18T21:58:49-04:00",
   "number":234,
   "note":null,
   "token":null,
   "gateway":null,
   "test":true,
   "total_price":"24.99",
   "subtotal_price":"14.99",
   "total_weight":0,
   "total_tax":"0.00",
   "taxes_included":false,
   "currency":"USD",
   "financial_status":"voided",
   "confirmed":false,
   "total_discounts":"5.00",
   "total_line_items_price":"19.99",
   "cart_token":null,
   "buyer_accepts_marketing":true,
   "name":"#9999",
   "referring_site":null,
   "landing_site":null,
   "cancelled_at":"2016-08-18T21:58:49-04:00",
   "cancel_reason":"customer",
   "total_price_usd":null,
   "checkout_token":null,
   "reference":null,
   "user_id":null,
   "location_id":null,
   "source_identifier":null,
   "source_url":null,
   "processed_at":null,
   "device_id":null,
   "browser_ip":null,
   "landing_site_ref":null,
   "order_number":1234,
   "discount_codes":[  

   ],
   "note_attributes":[  

   ],
   "payment_gateway_names":[  
      "visa",
      "bogus"
   ],
   "processing_method":"",
   "checkout_id":null,
   "source_name":"web",
   "fulfillment_status":"pending",
   "tax_lines":[  

   ],
   "tags":"",
   "contact_email":"jon@doe.ca",
   "order_status_url":null,
   "line_items":[  
      {  
         "id":25803694211,
         "variant_id":null,
         "title":"Disney - Duck Tales 2",
         "quantity":1,
         "price":"0.00",
         "grams":0,
         "sku":"POD-10290101-DT2",
         "variant_title":null,
         "vendor":null,
         "fulfillment_service":"manual",
         "product_id":7983911363,
         "requires_shipping":true,
         "taxable":true,
         "gift_card":false,
         "name":"Disney - Duck Tales 2",
         "variant_inventory_management":null,
         "properties":[
          {
            "name": "image_url",
            "value": "test_image_url_value"
          }  

         ],
         "product_exists":true,
         "fulfillable_quantity":1,
         "total_discount":"0.00",
         "fulfillment_status":null,
         "tax_lines":[  

         ]
      },
      {  
         "id":19,
         "variant_id":null,
         "title":"Short Sleeve T-Shirt",
         "quantity":1,
         "price":"19.99",
         "grams":454,
         "sku":"POD-0001",
         "variant_title":null,
         "vendor":null,
         "fulfillment_service":"manual",
         "product_id":7983919043,
         "requires_shipping":true,
         "taxable":true,
         "gift_card":false,
         "name":"Short Sleeve T-Shirt",
         "variant_inventory_management":null,
         "properties":[  

         ],
         "product_exists":true,
         "fulfillable_quantity":1,
         "total_discount":"5.00",
         "fulfillment_status":null,
         "tax_lines":[  

         ]
      }
   ],
   "shipping_lines":[  
      {  
         "id":1234567,
         "title":"Generic Shipping",
         "price":"10.00",
         "code":null,
         "source":"shopify",
         "phone":null,
         "requested_fulfillment_service_id":null,
         "delivery_category":null,
         "carrier_identifier":null,
         "tax_lines":[  

         ]
      }
   ],
   "billing_address":{  
      "first_name":"Bob",
      "address1":"123 Billing Street",
      "phone":"555-555-BILL",
      "city":"Billtown",
      "zip":"K2P0B0",
      "province":"Kentucky",
      "country":"United States",
      "last_name":"Biller",
      "address2":null,
      "company":"My Company",
      "latitude":null,
      "longitude":null,
      "name":"Bob Biller",
      "country_code":"US",
      "province_code":"KY"
   },
   "shipping_address":{  
      "first_name":"Steve",
      "address1":"123 Shipping Street",
      "phone":"555-555-SHIP",
      "city":"Shippington",
      "zip":"K2P0S0",
      "province":"Kentucky",
      "country":"United States",
      "last_name":"Shipper",
      "address2":null,
      "company":"Shipping Company",
      "latitude":null,
      "longitude":null,
      "name":"Steve Shipper",
      "country_code":"US",
      "province_code":"KY"
   },
   "fulfillments":[  

   ],
   "refunds":[  

   ],
   "customer":{  
      "id":1234567,
      "email":"john@test.com",
      "accepts_marketing":false,
      "created_at":null,
      "updated_at":null,
      "first_name":"John",
      "last_name":"Smith",
      "orders_count":0,
      "state":"disabled",
      "total_spent":"0.00",
      "last_order_id":null,
      "note":null,
      "verified_email":true,
      "multipass_identifier":null,
      "tax_exempt":false,
      "tags":"",
      "last_order_name":null,
      "default_address":{  
         "id":1234567,
         "first_name":null,
         "last_name":null,
         "company":null,
         "address1":"123 Elm St.",
         "address2":null,
         "city":"Ottawa",
         "province":"Ontario",
         "country":"Canada",
         "zip":"K2H7A8",
         "phone":"123-123-1234",
         "name":"",
         "province_code":"ON",
         "country_code":"CA",
         "country_name":"Canada",
         "default":false
      }
   }
};




{ {         
  "type": "ORDER",
  "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
  "method": "create",
  "mode": "debug",
  "status": "In Production",
  "status_code": "6",
  "xid": "TEST0001",
  "notes": "Hybrid Order Test",
  "shiplabel_url": "",
  "pack_url": "",
  "giftnote_comment": "",
  "shipping_carrier": "MI",
  "shipping_priority": "4272",
  "shipping_account": "",
  "shipping_name": "Avery Ma",
  "shipping_address1": "5757 Plaza Dr",
  "shipping_address2": "Ste 250",
  "shipping_city": "Cypress",
  "shipping_state": "CA",
  "shipping_country": "US",
  "shipping_zipcode": "90630",
  "shipping_phone": "7142432538",
  "shipping_email": "ama@hybridapparel.com",
  "billing_name": "Avery Ma",
  "billing_address1": "5757 Plaza Dr",
  "billing_address2": "Ste 250",
  "billing_city": "Cypress",
  "billing_state": "CA",
  "billing_country": "US",
  "billing_zipcode": "90630",
  "billing_phone": "7142432538",
  "billing_email": "ama@hybridapparel.com",
  "items_quantity": "1",
  "items_amount": "",
  "items_tax": "",
  "items": [{
    "name": "Test Art ",          
    "sku": "10220201",           
    "quantity": "1",    
    "unit_amount": "",            
    "subtotal_amount": "",     
    "necklabel_binid": "",       
    "hangtag_binid": "",         
    "attributes": [      
    {           
      "type": "DigitalPrint",
      "location": "CF",
      "thumbnail": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
      "preview": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
      "file_url": "https://cdn.shopify.com/s/files/1/1377/6091/files/7307.png?17912944270534919095",
      "file_extension": "png",
      "file_size": "",
      "file_hash": "",
      "width" : "6",
      "height": "8"
    }
    ]           
  }           
  ]           
};


{}

{         
  "type": "ORDER",
  "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
  "method": "create",
  "mode": "debug",
  "status": "In Production",
  "status_code": "6",
  "xid": "TEST0010",
  "notes": "Hybrid Order Test",
  "shiplabel_url": "",
  "pack_url": "",
  "giftnote_comment": "",
  "shipping_carrier": "MI",
  "shipping_priority": "4272",
  "shipping_account": "",
  "shipping_name": "Avery Ma",
  "shipping_address1": "5757 Plaza Dr",
  "shipping_address2": "Ste 250",
  "shipping_city": "Cypress",
  "shipping_state": "CA",
  "shipping_country": "US",
  "shipping_zipcode": "90630",
  "shipping_phone": "7142432538",
  "shipping_email": "ama@hybridapparel.com",
  "items_quantity": "1",
  "items_amount": "",
  "items_tax": "",
  "items": [{
    "name": "Test Art ",          
    "sku": "10290403",           
    "quantity": "1",    
    "unit_amount": "",            
    "subtotal_amount": "",     
    "necklabel_binid": "",       
    "hangtag_binid": "",         
    "attributes": [      
    {           
      "type": "DigitalPrint",
      "location": "CF",
      "thumbnail": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
      "preview": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
      "file_url": "https://cdn.shopify.com/s/files/1/1377/6091/files/DNY-2913_ART.png?17912944270534919095",
      "file_extension": "png"
    }
    ]           
  }           
  ]           
}         

