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
var moment           = require('moment');

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

// GET route to download Packing Slip

artGunRouter.get('/orders/:orderID/packslip', function(req, res) {
  console.log('get pack slip endpoint hit');
  var orderXID = req.params.orderID;
  var sourceBodyJSON = {};
  var templateSourceJSON = {};
  Order.findOne({
      where: {OrderID: orderXID}
    }).then(function(order) {
      sourceBodyJSON = order.Body;
      console.log('the barcode value is ' + sourceBodyJSON.barcodeValue);
      templateSourceJSON.billing_name = sourceBodyJSON.billing_name;
      templateSourceJSON.billing_address1 = sourceBodyJSON.billing_address1;
      templateSourceJSON.billing_address2 = sourceBodyJSON.billing_address2;
      templateSourceJSON.billing_city = sourceBodyJSON.billing_city;
      templateSourceJSON.billing_state = sourceBodyJSON.billing_state;
      templateSourceJSON.billing_zipcode = sourceBodyJSON.billing_zipcode;
      templateSourceJSON.shipping_name = sourceBodyJSON.shipping_name;
      templateSourceJSON.shipping_address1 = sourceBodyJSON.shipping_address1;
      templateSourceJSON.shipping_address2 =  sourceBodyJSON.shipping_address2;
      templateSourceJSON.shipping_city = sourceBodyJSON.shipping_city;
      templateSourceJSON.shipping_state = sourceBodyJSON.shipping_state;
      templateSourceJSON.shipping_zipcode = sourceBodyJSON.shipping_zipcode;
      //templateSourceJSON.date = moment(sourceBodyJSON.time, "ddd, DD MMM YYYY ").format("MM/DD/YYYY");
      templateSourceJSON.date = sourceBodyJSON.time;
      templateSourceJSON.xid = sourceBodyJSON.xid;
      templateSourceJSON.items = [];
      templateSourceJSON.merchandiseTotal = 0;
      for (var i=0; i<sourceBodyJSON.items.length; i++) {
        var lineItem = {};
        lineItem.name = sourceBodyJSON.items[i].name;
        lineItem.index = i + 1;
        lineItem.UPC = sourceBodyJSON.items[i].UPC;
        lineItem.quantity = sourceBodyJSON.items[i].quantity;
        lineItem.unit_amount = sourceBodyJSON.items[i].unit_amount;
        var floatLineItemTotal = parseInt(lineItem.quantity) * parseInt(lineItem.unit_amount);
        lineItem.lineItemTotal = parseFloat(Math.round(floatLineItemTotal * 100) / 100).toFixed(2)
        var floatMerchandiseTotal = parseInt(templateSourceJSON.merchandiseTotal) + parseInt(lineItem.lineItemTotal);
        templateSourceJSON.merchandiseTotal = parseFloat(Math.round(floatMerchandiseTotal * 100) / 100).toFixed(2);
        templateSourceJSON.items.push(lineItem);
      };
      templateSourceJSON.shippingCharge = parseFloat(Math.round(sourceBodyJSON.shippingCharge * 100) / 100).toFixed(2);
      templateSourceJSON.items_tax = sourceBodyJSON.items_tax;
      var floatOrderTotal = parseInt(templateSourceJSON.merchandiseTotal) + parseInt(templateSourceJSON.shippingCharge) 
                                      + parseInt(templateSourceJSON.items_tax);
      templateSourceJSON.orderTotal = parseFloat(Math.round(floatOrderTotal * 100) / 100).toFixed(2);
      templateSourceJSON.cardType = sourceBodyJSON.cardType;
      templateSourceJSON.cardDigits = sourceBodyJSON.cardDigits;
      templateSourceJSON.barcodeValue = sourceBodyJSON.barcodeValue;
      var html = compPackSlipHTML(templateSourceJSON);
      console.log(html);
      var options = {
        "type": "pdf",
        "base": 'http://tranquil-fortress-90513.herokuapp.com/',
        "format": "Letter",
        "orientation": "portrait"
      };
      var fileNameWrite = 'packSlip_' + orderXID + '.pdf';
      pdf.create(html, options).toFile(fileNameWrite, function(err, file) {
        if (err) return console.log(err);
        console.log(file);
        res.download(file.filename);
      });
    });
  console.log('heres the end of the pack slip route');
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
    res.status(403).send("invalid credentials, signature does not match");
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
        tracking_number: JSON.parse(req.body.data).tracking_number,
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

artGunRouter.post('/orders/pack_slip/test', function(req, res) {
  console.log('test pack slip route hit bro');
  var orderXID = req.body.orderJSON.xid;
  var html = compPackSlipHTML(req.body.orderJSON);
  var options = {
    "type": "pdf",
    "base": 'http://tranquil-fortress-90513.herokuapp.com/',
    "format": "Letter",
    "orientation": "portrait"
  };
  var fileNameWrite = 'packSlip_' + orderXID + '.pdf';
  pdf.create(html, options).toFile(fileNameWrite, function(err, file) {
    if (err) return console.log(err);
    console.log(file);
    res.download(file.filename);
  });
  console.log('heres the end of the test route brough');
});


artGunRouter.get('/orders/:orderID/status', function(req, res) {
  console.log('get route for order status hit');
  var responseJSON = {};
  var orderXID = req.params.orderID;
  console.log("req.params.orderID is " + req.params.orderID);
  Order.findOne({
    where: {OrderID: orderXID}
  }).then(function(order) {
    // responseJSON.orderID =  order.orderID;
    // responseJSON.isProcessed = order.isProcessed;
    // if (responseJSON.isProcessed === true) {
    //   responseJSON.tracking = order.shipments.tracking
    // }
    Shipment.findOne({
      where: {order_id: order.id}
    }).then(function(shipment) {
      res.send(order + " and heres the shipment " + shipment);
    })
  });
});



module.exports = artGunRouter;


