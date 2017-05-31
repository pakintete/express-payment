var express = require('express');
var router = express.Router();
var request = require('request');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('2c2p', { title: 'Express' });
});

router.post('/payment', function(req, res, next) {
  // console.log(req.body)
  console.log("Payment Run");
  const secretKey = 'fAFfc0c8j99F';
  const stringToHash = req.body.version + req.body.merchant_id + req.body.payment_description + req.body.order_id + req.body.invoice_no + req.body.currency + req.body.amount + req.body.customer_email + req.body.pay_category_id + req.body.promotion + req.body.user_defined_1 + req.body.user_defined_2 + req.body.user_defined_3 + req.body.user_defined_4 + req.body.user_defined_5 + req.body.result_url_1 + req.body.result_url_2 + req.body.enable_store_card + req.body.stored_card_unique_id + req.body.pan_masked + req.body.request_3ds + req.body.recurring + req.body.order_prefix + req.body.recurring_amout + req.body.allow_accumulate + req.body.max_accumulate + req.body.recurring_interval + req.body.recurring_count + req.body.charge_next_date + req.body.charge_on_date + req.body.payment_option + req.body.payment_expiry + req.body.default_lang + req.body.statementDesciptor; 

  const hash = crypto.createHmac('sha1', secretKey).update(stringToHash).digest('hex');

  // console.log(hash.toUpperCase());
  req.body.hash_value = hash.toUpperCase();

  console.log(req.body);

  // return res.redirect('https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment')

// const hmac = crypto.createHmac('sha256', secretKey);

// hmac.on('readable', () => {
//   const data = hmac.read();
//   if (data)
//     console.log(data.toString('hex'));
//     // Prints:
//     //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
// });

// hmac.write('stringToHash');
// hmac.end();
  
  var options = {
   method: 'post',
   body: req.body, // Javascript object
   json: false, // Use,If you are sending JSON data
   url: 'https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment',
   headers: {
      'Content-Type' : 'application/x-www-form-urlencoded' 
     }
   }

   request(options, function (req, res, body) {
     if (req) {
       console.log(req);
       return
     }
     console.log(' Body :', body);
   });
  return res.redirect('https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment')
});


router.get('/form', function(req ,res ,next){
  res.render('index',{title : 'Form'})
});



module.exports = router;
