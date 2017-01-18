var express          = require('express');
var TSCRouter        = express.Router();
var request          = require('request');
var sha1             = require('js-sha1');
var models           = require('../models');
var Order            = models.orders;
var Shipment         = models.shipments;
var Communication    = models.communications;
var fs               = require('fs');
var pdf              = require('html-pdf');
var path             = require('path');
var Handlebars       = require('handlebars');
var packSlipHTML     = fs.readFileSync('./public/TSCpackSlipTemplate.html', 'utf8');
var compPackSlipHTML = Handlebars.compile(packSlipHTML);
var moment           = require('moment');
var Globalize        = require("globalize");
var pdf2img          = require('pdf2img');
Globalize.load(require( "cldr-data").entireSupplemental() );
Globalize.load(require( "cldr-data").entireMainFor("en") );
Globalize.locale( "en" );

var TSCKey           = process.env.ARTGUN_KEY;
var TSCSecret        = process.env.ARTGUN_SECRET;
var hybridKey        = process.env.HYBRID_KEY;
var hybridSecret     = process.env.HYBRID_SECRET;

Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});

// verifies shipment notification from ArtGun with SHA1 hashed sum of shared secret, key, and data object

var authTSCReq = function (TSCReq) {
  var hashedSig = sha1(TSCSecret + TSCKey + TSCReq.data);
  if (hashedSig !== TSCReq.signature) {
    console.log('request not accepted - invalid credentials and signature');
    var errorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match sha1(secret + key + data)"
    };
    return false;
  } else if (hashedSig == TSCReq.signature) {
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
    return false;
  } else if (hybridSig == hybridOrderReq.signature) {
    console.log('valid creds');
    return true;
  };
};

// logs all incoming requests

var persistCommunication = function (request) {
  Communication.create(request).then(function(newCommunication) {
    console.log('new communication logged');
  });
};

// logs an incoming order to postgres

var persistNewOrder = function (newOrderJSON) {
  Order.create({
    OrderID: newOrderJSON.orderJSON.xid,
    isProcessed: false,
    Body: newOrderJSON,
    Method: "tsc"
  }).then(function(newOrderRecord) {
    console.log('new order persisted');
  });
};

// after artGunPostReq() is called, the ArtGun res is logged if success
// separated success and error functions for potential future notifications 

var persistTSCResSuccess = function (TSCRes) {
  Order.findOne({
    where:{OrderID: TSCRes.xid}
  }).then(function (order) {
    console.log('TSC res to db is ...  ' + JSON.stringify(TSCRes));
    order.update({
      EndpointResponseID: TSCRes.receipt_id,
      EndpointResponseBody: TSCRes,
      isProcessed: true
    }).then(function () {
      console.log('new TSC res persisted');
    })
  })
};

// after artGunPostReq() is called, the ArtGun res is logged if error


var persistTSCResError = function(TSCRes) {
  Order.findOne({
    where: {OrderID: TSCRes.xid}
  }).then(function (order) {
    console.log('TSC res to db plus found order is ...  ' + TSCRes + order);
    order.update({
      EndpointResponseID: TSCRes.receipt_id,
      EndpointResponseBody: TSCRes,
      isProcessed: false
    }).then(function () {
      console.log('new error persisted');
    })
  })
};

// makes a POST req to the TSC API, call functions to persist response

var newTSCPostReq = function (orderDataJSON) {
  var options = { 
    method: 'POST',
    url: 'http://apptest.tscmiami.com/api/order/create',
    headers: 
    { 'cache-control': 'no-cache',
      'content-type': 'application/json' },
    body: orderDataJSON
  };
  request(options, function (error, response, body) {
    console.log(response.body);
    var TSCResBody = response.body;
    if (TSCResBody.res == "success") {
      persistTSCResSuccess(TSCResBody);
      // persistCommunication({
      //   endpoint: options.url,
      //   reqType: "new order",
      //   esbReqBody: orderDataJSON,
      //   esbResBody: TSCResBody,
      //   status: "received",
      //   xid: JSON.parse(orderDataJSON).xid
      // });
      console.log('successfully processed new TSC order... ' + JSON.stringify(TSCResBody));
    } else if (TSCResBody.res == "error") {
      // persistCommunication({
      //   endpoint: options.url,
      //   reqType: "new order",
      //   esbReqBody: orderDataJSON,
      //   esbResBody: TSCResBody,
      //   status: "error",
      //   xid: JSON.parse(orderDataJSON).xid
      // });
      persistTSCResError(TSCResBody);
      console.log('error processing order to TSC - please check TSC error... ' + JSON.stringify(TSCResBody));
    };
  });
};

var cancelTSCOrder = function(xid) {
  var cancelBody = {
    'time': Globalize.dateFormatter({ datetime: "medium"})(new Date()),
    'xid': xid,
    'mode': 'debug',
    'event': {
      'name': 'cancel_order',
      'description': 'cancel order request'
    }
  };
  var TSCSig = sha1(TSCSecret + TSCKey + JSON.stringify(cancelBody));
  //var TSCPostBody = "Key=" + TSCKey + "&data=" + JSON.stringify(cancelBody) + "&signature=" + TSCSig;
  var TSCPostBody = {
    key: TSCKey,
    data: cancelBody,
    signature: TSCSig
  };
  var options = {
    method: 'POST',
    url: 'http://apptest.tscmiami.com/api/order/cancelorder',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    body: JSON.stringify(TSCPostBody)
  };
  console.log('full req to tsc is - ' + JSON.stringify(options));
  request(options, function(error, response, body) {
    console.log(response.body);
    var TSCResBody = response.body;
    if (TSCResBody.res == "success") {
      console.log('cancel order to tsc success');
    } else if (TSCResBody.res == "error") {
      console.log('cancel order to tsc error, please check error message - ' + response.body);
    };
  });
};

// receive POST from ArtGun with shipment notification, associate with existing order_id and persist to shipments table

var persistTSCShipment = function (shipmentJSON) {
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

TSCRouter.get('/orders/:orderID/packslip', function(req, res) {
  console.log('get pack slip endpoint hit');
  var orderXID = req.params.orderID;
  var sourceBodyJSON = {};
  var templateSourceJSON = {};
  Order.findOne({
      where: {OrderID: orderXID}
    }).then(function(order) {
      Globalize.locale("en");
      sourceBodyJSON = order.Body;
      templateSourceJSON.billing_name = sourceBodyJSON.orderJSON.billing_name;
      templateSourceJSON.billing_address1 = sourceBodyJSON.orderJSON.billing_address1;
      templateSourceJSON.billing_address2 = sourceBodyJSON.orderJSON.billing_address2;
      templateSourceJSON.billing_city = sourceBodyJSON.orderJSON.billing_city;
      templateSourceJSON.billing_state = sourceBodyJSON.orderJSON.billing_state;
      templateSourceJSON.billing_zipcode = sourceBodyJSON.orderJSON.billing_zipcode;
      templateSourceJSON.shipping_name = sourceBodyJSON.orderJSON.shipping_name;
      templateSourceJSON.shipping_address1 = sourceBodyJSON.orderJSON.shipping_address1;
      templateSourceJSON.shipping_address2 =  sourceBodyJSON.orderJSON.shipping_address2;
      templateSourceJSON.shipping_city = sourceBodyJSON.orderJSON.shipping_city;
      templateSourceJSON.shipping_state = sourceBodyJSON.orderJSON.shipping_state;
      templateSourceJSON.shipping_zipcode = sourceBodyJSON.orderJSON.shipping_zipcode;
      templateSourceJSON.date = Globalize.dateFormatter({ skeleton: "yMd" })(order.createdAt);
      templateSourceJSON.xid = sourceBodyJSON.orderJSON.xid;
      templateSourceJSON.items = [];
      var merchTotal = 0;
      for (var i=0; i<sourceBodyJSON.orderJSON.items.length; i++) {
        var lineItem = {};
        lineItem.name = sourceBodyJSON.orderJSON.items[i].name;
        lineItem.index = i + 1;
        lineItem.UPC = sourceBodyJSON.orderJSON.items[i].UPC;
        lineItem.quantity = sourceBodyJSON.orderJSON.items[i].quantity;
        lineItem.unit_amount = Globalize.currencyFormatter("USD")(parseFloat(sourceBodyJSON.orderJSON.items[i].unit_amount));
        lineItem.lineItemTotal = Globalize.currencyFormatter( "USD" )(parseFloat(sourceBodyJSON.orderJSON.items[i].unit_amount) * parseFloat(sourceBodyJSON.orderJSON.items[i].quantity));
        merchTotal = merchTotal + (parseFloat(sourceBodyJSON.orderJSON.items[i].unit_amount) * parseFloat(sourceBodyJSON.orderJSON.items[i].quantity));
        templateSourceJSON.items.push(lineItem);
      };
      templateSourceJSON.giftMessage = sourceBodyJSON.orderJSON.giftnote_comment;
      templateSourceJSON.merchandiseTotal = Globalize.currencyFormatter("USD")(parseFloat(merchTotal));
      templateSourceJSON.shippingCharge = Globalize.currencyFormatter("USD")(parseFloat(sourceBodyJSON.shippingCharge));
      templateSourceJSON.items_tax = Globalize.currencyFormatter("USD")(parseFloat(sourceBodyJSON.orderJSON.items_tax));
      var sumOrderTotal = ( parseFloat(merchTotal) + parseFloat(sourceBodyJSON.shippingCharge) + parseFloat(sourceBodyJSON.orderJSON.items_tax) );
      templateSourceJSON.orderTotal = Globalize.currencyFormatter("USD")(sumOrderTotal);
      templateSourceJSON.cardType = sourceBodyJSON.cardType;
      templateSourceJSON.cardDigits = sourceBodyJSON.cardDigits;
      var testBarcodeValue = sourceBodyJSON.barcodeValue;
      templateSourceJSON.reservationNumber = testBarcodeValue;
      templateSourceJSON.barcodeValue1 = '<script>JsBarcode("#barcode1", "' + testBarcodeValue + '",  {format:"CODE39", height:40, width:2, fontSize:12});</script>';      
      
      var macysReturnCodeN = "- Visit www.macys.com/easyreturn to create and print your free return label.";
      var macysReturnCodeNX = "- If you have any questions or would like assistance with a return, please refer to the CONTACT US information at the top of this page.";
      var macysReturnCodeS = "- Visit www.macys.com/easyreturn to create and print your free return label.<br>IN STORE     Most purchases can be returned to your local Macy's store:<br>- Take your merchandise and this invoice (make sure the barcode is attached) to your local store.<br>- Any sales associate can process your return.";
      
      var bloomReturnCodeN = "- Visit www.bloomingdales.com/easyreturn to create and print your free return label.";
      var bloomReturnCodeNX = "- If you have any questions or would like assistance with a return, please refer to the CONTACT US information at the top of this page.";
      var bloomReturnCodeS = "- Visit www.bloomingdales.com/easyreturn to create and print your free return label.<br>IN STORE     Most purchases can be returned to your local Bloomingdale's store:<br>- Take your merchandise and this invoice (make sure the barcode is attached) to your local store.<br>- Any sales associate can process your return."
      
      if (sourceBodyJSON.brand == 11 || sourceBodyJSON.brand == 13) {
        templateSourceJSON.logo = '<img src="https://cdn.shopify.com/s/files/1/0641/9285/files/MacysLogo.png?12072762125356310521" alt="" style="max-width:100%;">';
        templateSourceJSON.contactInfo = "www.macys.com/contactus<br>1-800-289-6229<br>customerservice@macys.com";  
      } else if (sourceBodyJSON.brand == 21 || sourceBodyJSON.brand == 23) {
        templateSourceJSON.logo = '<img src="https://cdn.shopify.com/s/files/1/0641/9285/files/BloomingdalesLogo.png?16454377556678490292" alt="" style="max-width:100%;">';
        templateSourceJSON.contactInfo = 'www.bloomingdales.com/contactus<br>1-800-777-0000<br>customerservice@bloomingdales.com';
      };

      if ((sourceBodyJSON.brand == 11 || sourceBodyJSON.brand == 13) && ["NV", "NE", "NN", "NM", "NJ", "NW", "NP", "NG"].indexOf(sourceBodyJSON.returnCode) > -1) {
        templateSourceJSON.returnInstructions = macysReturnCodeN;
      } else if ((sourceBodyJSON.brand == 11 || sourceBodyJSON.brand == 13) && sourceBodyJSON.returnCode == "NX") {
        templateSourceJSON.returnInstructions = macysReturnCodeNX;
      } else if ((sourceBodyJSON.brand == 11 || sourceBodyJSON.brand == 13) && ["SE", "SM", "SN", "SJ", "SW", "SP", "SG", "SX", "SV"].indexOf(sourceBodyJSON.returnCode) > -1) {
        templateSourceJSON.returnInstructions = macysReturnCodeS;
      };

      if ((sourceBodyJSON.brand == 21 || sourceBodyJSON.brand == 23) && ["NV", "NE", "NN", "NM", "NJ", "NW", "NP", "NG"].indexOf(sourceBodyJSON.returnCode) > -1) {
        templateSourceJSON.returnInstructions = bloomReturnCodeN;
      } else if ((sourceBodyJSON.brand == 21 || sourceBodyJSON.brand == 23) && sourceBodyJSON.returnCode == "NX") {
        templateSourceJSON.returnInstructions = bloomReturnCodeNX;
      } else if ((sourceBodyJSON.brand == 21 || sourceBodyJSON.brand == 23) && ["SE", "SM", "SN", "SJ", "SW", "SP", "SG", "SX", "SV"].indexOf(sourceBodyJSON.returnCode) > -1) {
        templateSourceJSON.returnInstructions = bloomReturnCodeS;
      };

      var html = compPackSlipHTML(templateSourceJSON);
      var options = {
        "type": "pdf",
        "base": 'http://tranquil-fortress-90513.herokuapp.com/',
        "border": "0",
        "quality": "100",
        "format": "letter"
      };
      var fileNameWrite = 'packSlip_' + orderXID + '.pdf';
      pdf.create(html, options).toFile(fileNameWrite, function(err, file) {
        if (err) return console.log(err);
        pdf2img.setOptions({
          type: 'jpeg',                      // png or jpeg, default png 
          size: 1024,                       // default 1024 
          density: 600,                     // default 600 
          outputdir: __dirname,            // mandatory, outputdir must be absolute path 
          targetname: 'test'                // the prefix for the generated files, optional 
        });

        pdf2img.convert(file.filename, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            var testJPEG = info[0].path;
            res.download(testJPEG);
          };
        });
      });
    });
  console.log('heres the end of the pack slip route');
});

// POST route to create a new order to send to ArtGun; calls authHybridReq to authorize, then persistNewOrder
// to persist the order data, then calls newArtGunPostReq to send the order data to ArtGun

TSCRouter.post('/orders/new', function(req, res) {
  console.log('full req is  ' + req.body);
  var orderReqBody = req.body.orderJSON;
  authHybridReq(req.body);
  if (authHybridReq(req.body) == true) {
    console.log("hybrid sig verified");
    // persistCommunication({
    //   endpoint: req.route.path,
    //   status: "received",
    //   reqOrigin: req.host,
    //   reqBody: req.body,
    //   resBody: {status: "200", message: 'order received and will be processed'},
    //   reqType: "new order",
    //   xid: req.body.orderJSON.xid,
    //   orderID: req.body.OrderID
    // });
    persistNewOrder(req.body);
    var TSCSig = sha1(TSCSecret + TSCKey + JSON.stringify(orderReqBody));
    // var TSCPostBody = "Key=" + TSCKey + "&data=" + JSON.stringify(orderReqBody) + "&signature=" + TSCSig;
    var TSCPostBody = {
      key: TSCKey,
      data: JSON.stringify(orderReqBody),
      signature: TSCSig
    }
    newTSCPostReq(JSON.stringify(TSCPostBody));
    res.status(200).send('order received and will be processed');
  } else if (authHybridReq(req.body) != true) {
    var hybridErrorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match"
    };
    // persistCommunication({
    //   endpoint: req.route.path,
    //   status: "not received",
    //   reqBody: req.body,
    //   resBody: hybridErrorRes,
    //   reqType: "new order",
    //   xid: req.body.orderJSON.xid,
    //   orderID: req.body.OrderID
    // });
    console.log("invalid signature");
    res.status(403).send(hybridErrorRes);
  };
});

// POST route for ArtGun shipment updates

TSCRouter.post('/shipments/update', function(req,res) {
  var resJSON = {};
  authTSCReq(req.body);
  if (authTSCReq(req.body) == true) {
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

TSCRouter.get('/orders/:orderID/status/:signature/', function(req, res) {
  console.log('get route for order status hit');
  var authSig = sha1(TSCSecret + TSCKey + req.params.orderID);
  if (authSig != req.params.signature) {
    console.log('request not accepted - invalid credentials and signature');
    var hybridErrorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match"
    };
    res.send(hybridErrorRes).status(403);  
  } else if (authSig === req.params.signature) {
    var responseJSON = {};
    Order.findOne({
      where: {OrderID: req.params.orderID},
      include: Shipment
    }).then(function(order) {
      responseJSON.isProcessed = order.isProcessed;
      responseJSON.OrderID = order.OrderID;
      responseJSON.ArtGunResponseBody = order.EndpointResponseBody;
      if (order.shipments[0]) {    
          responseJSON.isShipped = JSON.parse(order.shipments[0].body).status;
          responseJSON.trackingNumber = JSON.parse(order.shipments[0].body).tracking_number;
          responseJSON.billOfLading = JSON.parse(order.shipments[0].body).bol;
      };
      res.send(responseJSON).status(200);
    });  
  }
});

TSCRouter.post('/orders/:orderID/cancel/', function(req, res) {
  console.log('cancel TSC order route hit');
  if (authHybridReq(req.body) == false) {
    console.log(req.body);
    console.log('request not accepted - invalid credentials and signature');
    var hybridErrorRes = {
      "error": "403 - authentication failed, invalid signature - request not received",
      "code": "1",
      "message": "signature does not match"
    };
    res.send(hybridErrorRes).status(403);
  } else if (authHybridReq(req.body) == true) {
    cancelTSCOrder(req.params.orderID);
    console.log("hybrid sig verified, order will be cancelled");
  };
});

TSCRouter.get('/dynowake/uptimecheck/', function (req, res) {
  console.log('uptime robot hit route to check status and prevent server sleep');
  res.status(200).send('thanks for checking...');
});

// TSCRouter.post('/orders/cancel/confirm', function(req, res) {
//   console.log('confirm cancel from TSC route hit');
//   var resJSON = {};
//   authTSCReq(req.body);
//   if (authTSCReq(req.body) == true) {
//     var orderReceiptID = "";
//     var orderPrimaryKey = "";    
//     Order.findOne({
//       where: {OrderID: JSON.parse(req.body).xid} })
//     .then(function(order){






//       orderReceiptID = order.EndpointResponseID;
//       orderPrimaryKey = order.id;
//       console.log('heres the order receipt id... ' + orderReceiptID);
//       Shipment.findOne({
//         where: {orderID: order.id}
//       }).then(function(shipment) {
//         if (shipment) {

//         }
//         resJSON.res = "success";
//         resJSON.time = shipment.createdAt;
//         resJSON.xid = req.body.xid;
//         resJSON.receipt_id = orderReceiptID;
//         console.log('shipment req reeceived and persisted' + resJSON);
//         res.status(200).send(resJSON);
//       });
//     });  
//   };
// });



module.exports = TSCRouter;


