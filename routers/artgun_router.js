require('dotenv').load();
var express       = require('express');
var artGunRouter  = express.Router();
var shopifyAPI    = require('shopify-node-api');
var request       = require('request');
var sha1          = require('js-sha1');
var models        = require('../models');
var Order         = models.orders;
var Shipment      = models.shipments;

var artGunKey     = process.env.ARTGUN_KEY;
var artGunSecret  = process.env.ARTGUN_SECRET;


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

var hybridTestOrder = {         
  "type": "ORDER",
  "time": "Mon, 05 Sep 2016 11:48:13 ­0600",
  "method": "create",
  "mode": "debug",
  "status": "In Production",
  "status_code": "6",
  "xid": "TEST0004",
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
};

// create native order JSON to test SHA1 hash against one ArtGun provided

// var hybridBasicTestOrderObject = {"type":"ORDER"}; 

// creates signature used in ArtGun API calls

// var artGunSig = function (orderObject) {
//   sha1(artGunSecret + "7611759cca374078933a55a2f3c836bf" + JSON.stringify(orderObject));
// }

// concatenates the ArtGun Key, order JSON, and computed ArtGun signature

// var artGunPostBody = "Key=7611759cca374078933a55a2f3c836bf" + "&data=" + JSON.stringify(hybridTestOrder) + "&signature=" + artGunSig;

// takes order JSON as an input, and makes POST call to ArtGun API to create new order

var artgunPostReq = function(orderDataJSON) {
  request.post(
    'http://75.119.176.75/artgunservicetest/OrderService.svc/PlaceOrder',
    { 'content-type': 'text/plain', body: orderDataJSON },
    function (error, response, body) {
        var artGunRes = JSON.stringify(response);
        if ( !error && response.statusCode == 200 ) {
            console.log('new post call worked -- ' + artGunRes);
        };
    }
  );
};

// verifies shipment notification from ArtGun with SHA1 hashed sum of shared secret, key, and data object

var authArtGunReq = function (artGunShipReq) {
  var hashedSig = sha1(artGunSecret + artGunKey + artGunShipReq.data);
  if (hashedSig !== artGunShipReq.signature) {
    console.log('request not accepted - invalid credentials and signature');
    return false;
  } else if (hashedSig == artGunShipReq.signature) {
    return true;
  };
};

// logs an incoming order to postgres

var persistNewOrder = function (newOrderJSON) {
  Order.create({
    OrderID: newOrderJSON.OrderID,
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
    console.log('artgun res to db is ...  ' + artGunRes);
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
    console.log('heres the response...' + JSON.stringify(artGunResBody));
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
  res.status(200).send( "get req working" );
});

// POST route to create a new order to send to ArtGun

artGunRouter.post('/orders/new', function(req, res) {
  var orderReqBody = req.body.orderJSON;
  persistNewOrder(req.body);
  var artGunSig = sha1(artGunSecret + artGunKey + JSON.stringify(orderReqBody));
  var artGunPostBody = "Key=" + artGunKey + "&data=" + JSON.stringify(orderReqBody) + "&signature=" + artGunSig;
  newArtGunPostReq(artGunPostBody);
  console.log('end of post route...');
  res.status(200).send('sending end of post route...');
});

// POST route for ArtGun shipment updates

artGunRouter.post('/shipments/update', function(req,res) {
  console.log("req body is: " + req.body);
  console.log("total req is: " + req);
  console.log("sig might be: " + req.body.signature);


  // if (authArtGunReq() === true) {
  //   var resJSON = {};
  //   var orderReceiptID = "";
  //   var orderPrimaryKey = "";
    
  //   Order.findOne({
  //     where: {OrderID: req.body.xid} })
  //   .then(function(order){
  //     orderReceiptID = order.EndpointResponseID;
  //     orderPrimaryKey = order.id;
  //     console.log('heres the order receipt id... ' + orderReceiptID);
  //     Shipment.create({
  //       order_id: orderPrimaryKey,
  //       status: req.body.status,
  //       tracking_number: req.body.tracking_number,
  //       body: req.body
  //     }).then(function(shipment) {
  //       resJSON.res = "success";
  //       resJSON.time = shipment.createdAt;
  //       resJSON.xid = req.body.xid;
  //       resJSON.receipt_id = orderReceiptID;
  //       console.log('shipment req reeceived and persisted' + resJSON);
  //       res.status(200).send(resJSON);
  //     });
  //   });  
  // };
});



module.exports = artGunRouter;

