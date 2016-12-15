var express       = require('express');
var artGunRouter  = express.Router();
var request       = require('request');
var sha1          = require('js-sha1');
var models        = require('../models');
var Order         = models.orders;
var Shipment      = models.shipments;
var fs            = require('fs');
var pdf           = require('html-pdf');
var path          = require('path');  

var artGunKey     = process.env.ARTGUN_KEY;
var artGunSecret  = process.env.ARTGUN_SECRET;
var hybridKey     = process.env.HYBRID_KEY;
var hybridSecret  = process.env.HYBRID_SECRET;





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
    "phantomPath": "./node_modules/phantomjs-prebuilt/bin/phantomjs",
    "timeout": 3000,
    "type": "pdf"
    };
  
  pdf.create(html, options).toFile('./packing_slips/packing_slips/packSlipTest8.pdf', function(err, file) {
    if (err) return console.log(err);
    console.log(file);
    res.download(file.filename);
  });

  console.log('end of shipment get route');
});


module.exports = artGunRouter;


