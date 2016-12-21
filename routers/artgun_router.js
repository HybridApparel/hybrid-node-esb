var express          = require('express');
var artGunRouter     = express.Router();
var request          = require('request');
var sha1             = require('js-sha1');
var models           = require('../models');
var Order            = models.orders;
var Shipment         = models.shipments;
var fs               = require('fs');
var pdf              = require('html-pdf');
var path             = require('path');
var Handlebars       = require('handlebars');
var packSlipHTML     = fs.readFileSync('./public/packSlipTemplate.html', 'utf8');
var compPackSlipHTML = Handlebars.compile(packSlipHTML);

var artGunKey        = process.env.ARTGUN_KEY;
var artGunSecret     = process.env.ARTGUN_SECRET;
var hybridKey        = process.env.HYBRID_KEY;
var hybridSecret     = process.env.HYBRID_SECRET;





// verifies shipment notification from ArtGun with SHA1 hashed sum of shared secret, key, and data object

var authArtGunReq = function (artGunShipReq) {
  var hashedSig = sha1(artGunSecret + artGunKey + artGunShipReq.data);
  if (hashedSig !== artGunShipReq.signature) {
    console.log('request not accepted - invalid credentials and signature');
    var errorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match sha1(secret + key + data)"
    };
    return errorRes;
  } else if (hashedSig == artGunShipReq.signature) {
    console.log('valid creds');
    return true;
  };
};

// verifies new order requests from Hybrid

var authHybridReq = function (hybridOrderReq) {
  var hybridSig = sha1(hybridSecret + hybridKey + JSON.stringify(hybridOrderReq.orderJSON) );
  if (hybridSig !== hybridOrderReq.signature) {
    console.log('request not accepted - invalid credentials and signature');
    var hybridErrorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match"
    };
    return hybridErrorRes;
  } else if (hybridSig == hybridOrderReq.signature) {
    console.log('valid creds');
    return true;
  };
};

// logs an incoming order to postgres

var persistNewOrder = function (newOrderJSON) {
  Order.create({
    OrderID: newOrderJSON.orderJSON.xid,
    isProcessed: false,
    Body: newOrderJSON.orderJSON
  }).then(function(newOrderRecord) {
    console.log('new order persisted');
  });
};

// after artGunPostReq() is called, the ArtGun res is logged if success
// separated success and error functions for potential future notifications 

var persistArtGunResSuccess = function (artGunRes) {
  Order.findOne({
    where:{OrderID: artGunRes.xid}
  }).then(function (order) {
    console.log('artgun res to db is ...  ' + artGunRes);
    order.update({
      EndpointResponseID: artGunRes.receipt_id,
      EndpointResponseBody: artGunRes,
      isProcessed: true,
    }).then(function () {
      console.log('new artgun res persisted');
    })
  })
};

// after artGunPostReq() is called, the ArtGun res is logged if error


var persistArtGunResError = function(artGunRes) {
  Order.findOne({
    where: {OrderID: artGunRes.xid}
  }).then(function (order) {
    console.log('artgun res to db plus found order is ...  ' + artGunRes + order);
    order.update({
      EndpointResponseID: artGunRes.receipt_id,
      EndpointResponseBody: artGunRes,
      isProcessed: false,
    }).then(function () {
      console.log('new error persisted');
    })
  })
};

// makes a POST req to the ArtGun API, call functions to persist response

var newArtGunPostReq = function (orderDataJSON) {
  
  var options = { 
    method: 'POST',
    url: 'http://75.119.176.75/artgunservicetest/OrderService.svc/PlaceOrder',
    headers: 
    { 'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded' },
    body: orderDataJSON
  };
  request(options, function (error, response, body) {
    var artGunResBody = JSON.parse(response.body);
    if (artGunResBody.res == "success") {
      persistArtGunResSuccess(artGunResBody);
      console.log('successfully processed new ArtGun order... ' + JSON.stringify(artGunResBody));
    } else if (artGunResBody.res == "error") {
      persistArtGunResError(artGunResBody);
      console.log('error processing order to ArtGun - please check ArtGun error... ' + JSON.stringify(artGunResBody));
    };
  });
};

// receive POST from ArtGun with shipment notification, associate with existing order_id and persist to shipments table

var persistArtGunShipment = function (shipmentJSON) {
  var resJSON = {};
  var orderReceiptID = "";
  var orderPrimaryKey = "";
  Order.findOne({
    where: {OrderID: shipmentJSON.xid} })
  .then(function(order){
    orderReceiptID = order.EndpointResponseID;
    orderPrimaryKey = order.id;
    console.log('heres the order receipt id... ' + orderReceiptID);
    Shipment.create({
      order_id: orderPrimaryKey,
      status: shipmentJSON.status,
      tracking_number: shipmentJSON.tracking_number,
      body: shipmentJSON
    }).then(function(shipment) {
      resJSON.res = "success";
      resJSON.time = shipment.createdAt;
      resJSON.xid = shipmentJSON.xid;
      resJSON.receipt_id = orderReceiptID;
      console.log('shipment req reeceived and persisted' + resJSON);
      res.status(200).send(resJSON);
    });
  });
};

// GET route to ping server/test connection

artGunRouter.get('/orders/new', function(req, res) {
  console.log('get req endpoint working');
  res.status(200).sendFile('packSlipTest.html');
});

// POST route to create a new order to send to ArtGun; calls authHybridReq to authorize, then persistNewOrder
// to persist the order data, then calls newArtGunPostReq to send the order data to ArtGun

artGunRouter.post('/orders/new', function(req, res) {
  var orderReqBody = req.body.orderJSON;
  authHybridReq(req.body);
  if (authHybridReq(req.body) == true) {
    console.log("hybrid sig verified");
    persistNewOrder(req.body);
    var artGunSig = sha1(artGunSecret + artGunKey + JSON.stringify(orderReqBody));
    var artGunPostBody = "Key=" + artGunKey + "&data=" + JSON.stringify(orderReqBody) + "&signature=" + artGunSig;
    newArtGunPostReq(artGunPostBody);
    res.status(200).send('order received and will be processed');
  } else if (authHybridReq(req.body) != true) {
    console.log("invalid signature");
    res.status(403).send("invalid signature");
  };
});

// POST route for ArtGun shipment updates

artGunRouter.post('/shipments/update', function(req,res) {
  var resJSON = {};
  authArtGunReq(req.body);
  if (authArtGunReq(req.body) == true) {
    var orderReceiptID = "";
    var orderPrimaryKey = "";    
    Order.findOne({
      where: {OrderID: JSON.parse(req.body.data).xid} })
    .then(function(order){
      orderReceiptID = order.EndpointResponseID;
      orderPrimaryKey = order.id;
      console.log('heres the order receipt id... ' + orderReceiptID);
      Shipment.create({
        order_id: orderPrimaryKey,
        status: req.body.status,
        tracking_number: req.body.tracking_number,
        body: req.body
      }).then(function(shipment) {
        resJSON.res = "success";
        resJSON.time = shipment.createdAt;
        resJSON.xid = req.body.xid;
        resJSON.receipt_id = orderReceiptID;
        console.log('shipment req reeceived and persisted' + resJSON);
        res.status(200).send(resJSON);
      });
    });  
  };
});


artGunRouter.get('/orders/shipment', function(req, res) {
  console.log('get shipment by id req received');

  var html = fs.readFileSync('./public/packSlipTest.html', 'utf8');
  var options = {
    "type": "pdf",
    "base": 'http://tranquil-fortress-90513.herokuapp.com/',
    "format": "Letter",
    "orientation": "portrait"
    };
  
  pdf.create(html, options).toFile('./packing_slips/packing_slips/packSlipTest8.pdf', function(err, file) {
    if (err) return console.log(err);
    console.log(file);
    res.download(file.filename);
  });
  console.log('end of shipment get route');
});

artGunRouter.get('/orders/shipment/test', function(req, res) {
  console.log('test route hit bro');
  var generatePackSlip = function (order) {
    var testPoop = compPackSlipHTML(order);
    console.log(testPoop);
    return testPoop
  };


  var testPoopJSON = {
    "orderJSON":{         
      "type": "ORDER",
      "time": "Fri, 30 Sep 2016 11:48:13 ­0600",
      "method": "create",
      "mode": "auto",
      "status": "In Production",
      "status_code": "6",
      "xid": "ABC123",
      "notes": "Hybrid Order Test",
      "shiplabel_url": "",
      "pack_url": "",
      "giftnote_comment": "",
      "shipping_carrier": "MI",
      "shipping_priority": "4272",
      "shipping_account": "",
      "billing_name": "Joe Foo",
      "billing_address1": "123 Main Street",
      "billing_address2": "Apt 3",
      "billing_city": "Anytown",
      "billing_state": "NY",
      "billing_country": "US",
      "billing_zipcode": "11221",
      "shipping_name": "Joe Foo",
      "shipping_address1": "123 Main Street",
      "shipping_address2": "Apt 3",
      "shipping_city": "Anytown",
      "shipping_state": "NY",
      "shipping_country": "US",
      "shipping_zipcode": "11221",
      "shipping_phone": "8471231234",
      "shipping_email": "joe.foo@bar.com",
      "items_quantity": "1",
      "items_amount": "1.50",
      "lineItemTotal": "1.50",
      "merchandiseTotal": "3.00",
      "shippingCharge": "0.00",
      "cardType": "AMEX",
      "cardDigits": "4321",
      "items_tax": "0.05",
      "orderTotal": "3.05",
      "items": [{
        "name": "Bacon",          
        "sku": "10290403",
        "UPC": "111111111111UPC",           
        "quantity": "1",    
        "unit_amount": "1.50",            
        "subtotal_amount": "1.50",
        "lineItemTotal": "1.50",  
        "necklabel_binid": "",       
        "hangtag_binid": "",         
        "attributes": [      
        {           
          "type": "DigitalPrint",
          "location": "CF",
          "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
          "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
          "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
          "file_extension": "png"
        },
        {           
          "type": "DigitalPrint",
          "location": "FB",
          "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
          "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
          "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
          "file_extension": "png"
        },
        {
         "type": "HangTag",
         "location": "FN",
         "thumbnail": "http://partner.com/thumbnail.jpg",
         "preview": "http://partner.com/preview.jpg"
       }
       ]           
     },
     {
      "name": "More Bacon",          
      "sku": "10290404",
      "UPC": "2222222222UPC",           
      "quantity": "1",    
      "unit_amount": "1.50",            
      "subtotal_amount": "1.50",
      "lineItemTotal": "1.50",    
      "necklabel_binid": "",       
      "hangtag_binid": "",         
      "attributes": [      
      {           
        "type": "DigitalPrint",
        "location": "CF",
        "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
        "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
        "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
        "file_extension": "png"
      },
      {           
        "type": "DigitalPrint",
        "location": "FB",
        "thumbnail": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_THUMB_WRD-8479.png?13376761505423016394",
        "preview": "https://cdn.shopify.com/s/files/1/0641/9285/files/AG_PREVIEW_WRD-8479.png?13376761505423016394",
        "file_url": "https://cdn.shopify.com/s/files/1/0641/9285/files/WRD-8479_FPO-01.png?13376761505423016394",
        "file_extension": "png"
      },
      {
       "type": "HangTag",
       "location": "FN",
       "thumbnail": "http://partner.com/thumbnail.jpg",
       "preview": "http://partner.com/preview.jpg"
     }
     ]           
   }]           
 },
 "OrderID":"ABC123",
 "key": "UMJ4fTq0cc90Y3mOwvsn8eFohAn6Y6Er",
 "signature": "07175c00ab32c2e4c4c547b3d4fd52d8d6d9dc7e"
};
var html = generatePackSlip(testPoopJSON.orderJSON);

var options = {
  "type": "pdf",
  "base": 'http://tranquil-fortress-90513.herokuapp.com/',
  "format": "Letter",
  "orientation": "portrait"
};

pdf.create(html, options).toFile('./packing_slips/packing_slips/packSlipTest8.pdf', function(err, file) {
  if (err) return console.log(err);
  console.log(file);
  res.download(file.filename);
});

console.log('heres the end of the test route brough');
});

module.exports = artGunRouter;


