const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const WithdrawBox = require('../models/WithdrawBox');
const WithdrawBox2 = require('../models/WithdrawBox2');



const { forwardAuthenticated } = require('../config/auth');
let userId = ''

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/join', (req, res) => res.render('join'));
router.get('/terms', (req, res) => res.render('terms'));

// router.get('/testimony', (req, res) => {
//   User.findOne({ _id: req.query.id }).then(user => { 
//     User.updateOne({ _id: user }, { testimony : testimony }, function (err, user) {
//       if (err) {
//         res.json({
//           error: err
//         })
//       }
//     })

//     res.redirect('/users/register')
//   })
//   res.render('testimony')
// });

router.get('/pay', (req, res) => res.render('pay'));
router.get('/i', (req, res) => {
  console.log('reahing')
  User.findOne({ _id: req.query.id }).then(user => {
    User.updateOne({ _id: req.query.id }, { invite: user.invite + 1 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    res.redirect('/users/register')
  })
});
router.get('/close_user', (req, res) => {

  User.findOne({ _id: req.query.myId }).then(user => {

    User.updateOne({ _id: req.query.myId }, { $pull: { 'user': { payId: req.query.id } } },
      function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
      })


    res.redirect('/dashboard')
  })
});

router.post('/block', (req, res) => {

  console.log(req.query.id)

  User.findOne({ _id: req.query.id }).then(user => {

    User.updateOne({ _id: req.query.id }, { blocked: true },
      function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
      })


    res.redirect('/users/0000/admin/all_users')
  })
});

router.get('/paidUnblock', (req, res) => {

  User.findOne({ _id: req.query.id }).then(user => {

    User.updateOne({ _id: req.query.id }, { blocked: false },
      function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
      })


    res.redirect('/users/0000/admin/blocked_users')
  })
});

router.get('/close_paired', (req, res) => {
  User.findOne({ _id: req.query.myId }).then(user => {

    User.updateOne({ _id: req.query.myId }, { $pull: { 'paired': { userId: req.query.id } } },
      function (err, user) {
        console.log(user)
        if (err) {
          res.json({
            error: err
          })
        }
      })

    console.log('ddddd', req.query.id)

    User.updateOne({ _id: req.query.myId }, { $pull: { 'proof': { userId: req.query.id } } },
      function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
      })


    res.redirect('/dashboard')
  })
});

router.post('/proof', (req, res) => {
  const { img } = req.body;

  User.findOne({ _id: req.query.id }).then(user => {


    User.updateOne({ _id: user._id }, { $push: { proof: [{ img: img }] } }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
      console.log(user)
    })

    
  })

  res.redirect('/dashboard')

});
router.post('/proofR', (req, res) => {
  const { img } = req.body;

  User.findOne({ _id: userId }).then(user => {

    User.updateOne({ _id: user._id }, { $push: { registerProof: [{ img: img }] } }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })
  })

  res.redirect('/dashboard')

});


router.post('/blockProof', (req, res) => {
  const { img } = req.body;

  User.findOne({ _id: userId }).then(user => {

    User.updateOne({ _id: user._id }, { $push: { blockProof: [{ img: img }] } }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })
  })

  res.redirect('/dashboard')

});

router.get('/confirmPaid', (req, res) => {
  User.findOne({ _id: req.query.id }).then(user => {


    User.updateOne({ _id: user._id }, { withdraw: 0 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.updateOne({ _id: user._id }, { invested: 0 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })


    User.updateOne({ _id: user._id }, { amount: 0 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.updateOne({ _id: user._id }, { proof: [] }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }

    })

    User.updateOne({ _id: user._id }, { payto: false }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }

    }) 

  


    User.updateOne({ _id: user._id }, { btn: true }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }


    })

    
    User.updateOne({ _id: user._id }, { date: new Date() }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }

    })
    User.updateOne({ _id: user._id }, { proof: [] }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }

    })

    User.updateOne({ _id: user._id }, { paring: false }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
      console.log('false', user)

    })

    res.redirect('/users/0000/admin/payment')

  })


});


router.get('/confirm', (req, res) => {
  User.findOne({ _id: req.query.id }).then(user => {


    User.updateOne({ _id: user._id }, { withdraw: (user.amount / 100) * 50 + user.amount }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.updateOne({ _id: user._id }, { invested: user.amount }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.updateOne({ _id: user._id }, { amount: 0 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

   
    User.updateOne({ _id: user._id }, { investNumber: user.investNumber + 1 }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })


    User.updateOne({ _id: user._id }, { btn: false }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }


    })

    var day = user.date


    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 2);
    console.log(nextDay); // May 01 2000   

    User.updateOne({ _id: user._id }, { date: nextDay }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }

    })


    res.redirect('/users/0000/admin/donated_users')

  })


});


router.get('/paid', (req, res) => {
  User.updateOne({ _id: req.query.id }, { status: true }, function (err, user) {
    if (err) {
      res.json({
        error: err
      })
    }
  })
  res.redirect('/users/0000/admin')
});


router.get('/0000/admin', (req, res) => {

  User.find({ status: false }).then(user => {
    res.render('admin', {
      users: user
    })

  })
});

router.get('/0000/admin/payment', (req, res) => {

  User.find({ payto: true }).then(user => {
    res.render('payment', {
      users: user
    })

  })
});

router.get('/0000/admin/donated_users', (req, res) => {

  User.find({ "proof.0": { "$exists": true } }).then(user => {
    res.render('donated', {
      users: user
    })

  })
});


router.get('/0000/admin/blocked_users', (req, res) => {

  User.find({ blocked: true }).then(user => {
    res.render('blockedUsers', {
      users: user
    })

  })

});

router.get('/0000/admin/all_users', (req, res) => {

  User.find({}, function (err, user) {
    res.render('allUsers', { user: user });
  });

});




router.get('/donate', (req, res) => {
  userId = req.query.id;
  res.render('donate')
});
// add money by id, which is to update invate path and pick a user acct with the user id, because you will also update the user paired with detals, 
// get the user details from withdraw box and delete it

router.post('/donate', (req, res) => {

  const { amount } = req.body;
  let errors = [];

  if (!amount) {
    errors.push({ msg: 'Select an amount' });
  }

  User.findOne({ _id: userId }).then(user => {
    if (user.status == false) {

      errors.push({ msg: 'pay 1000 to activate your account' });
      res.render('pay', {
        errors,

      });
    } else if (user.blocked === true) {

      errors.push({ msg: 'Your Account have been blocked, pay 2000 to this Account Number' });
      res.render('blocked', {
        errors,

      });

    }
    else {

      User.updateOne({ _id: userId }, { amount: amount }, function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
      })

      User.updateOne({ _id: userId }, { paring: true }, function (err, user) {
        if (err) {
          res.json({
            error: err
          })
        }

      })
      res.redirect('/dashboard')
    }
  });

});


// want money by id, use the id, check the status, then add the user details to the withdraw collection 
router.get('/WantPayment', (req, res) => {
  userId = req.query.id;
  User.updateOne({ _id: userId }, { payto: true }, function (err, user) {
    if (err) {
      res.json({
        error: err
      })
    }
  })

  res.redirect('/dashboard')
})


// want money by id, use the id, check the status, then add the user details to the withdraw collection 
router.get('/withdraw', (req, res) => {
  userId = req.query.id;
  res.render('withdraw');
})

router.post('/withdraw', (req, res) => {
  const { name, phone, accName, accNo, bank } = req.body;
  let errors = [];

  if (!name || !phone || !accName || !accNo || !bank) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('withdraw', {
      errors,
      name,
      phone,
      accName,
      accNo,
      bank
    });
  } else {
    let myId = userId;
    let paired = []
    let amount = 0

    var user = {
      paring: false
    }
    User.update({ _id: myId }, user, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.findOne({ _id: myId }).then(user => {
      if (user.status === false) {

        errors.push({ msg: 'you need to register your account, pay 1000 to this Account Number' });
        res.render('pay', {
          errors,

        });
      } else if (user.blocked === true) {

        errors.push({ msg: 'Your Account have been blocked, pay 2000 to this Account Number' });
        res.render('blocked', {
          errors,

        });

      }
      else {

        let amount = user.withdraw

        let secR = amount.toString()[1];
        let threeR = amount.toString()[2];

        if (secR !== '5' && threeR === '5') {
          amount = amount - 2500

          let amount2 = 2500

          const withdraw = new WithdrawBox2({
            name,
            phone,
            accName,
            accNo,
            bank,
            myId,
            paired,
            amount2
          });


          withdraw
            .save()
            .then(withdraw => {
            })

        }


        const withdraw = new WithdrawBox({
          name,
          phone,
          accName,
          accNo,
          bank,
          myId,
          paired,
          amount
        });


        withdraw
          .save()
          .then(withdraw => {
            req.flash(
              'success_msg',
              'You will be paired shortly'
            );

            res.redirect('/dashboard');
          })
          .catch(err => console.log(err));

      }
    });





  }

});


// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, phone } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !phone) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email.toLowerCase() }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          phone
        });
      } else {
        let status = false;
        let invite = 0
        let invested = 0
        let withdraw = (invested / 100) * 30
        let investNumber = 0
        let user = []
        let blocked = false
        let paring = false
        let paired = []
        let btn = true
        let proof = []
        let registerProof = []
        let blockProof = []
        let amount = 0
        let payto = false

        const newUser = new User({
          name,
          email: email.toLowerCase(),
          password,
          phone,
          status,
          invite,
          invested,
          investNumber,
          user,
          blocked,
          withdraw,
          paring,
          paired,
          btn,
          proof,
          registerProof,
          blockProof,
          amount,
          payto
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// add details
router.post('/details', (req, res) => {
  const { name, phone, accName, accNo, bank } = req.body;
  let errors = [];

  if (!name || !phone || !accName || !accNo || !bank) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('withdraw', {
      errors,
      name,
      phone,
      accName,
      accNo,
      bank,
    });
  } else {
    let details = [{
      name,
      phone,
      accName,
      accNo,
      bank,
    }]
    User.updateOne({ _id: userId }, { $push: { detail: details } }, function (err, user) {
      if (err) {
        res.json({
          error: err
        })

      }


    })
  }

  res.redirect('/dashboard');

});



// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



//adim withdraw

router.get('/withdrawAdmin', (req, res) => {
  userId = req.query.id;
  res.render('withdrawAdmin');
})


router.post('/withdrawAdmin', (req, res) => {
  const { name, phone, accName, accNo, bank, amountB } = req.body;
  let errors = [];

  if (!name || !phone || !accName || !accNo || !bank || !amountB) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('withdrawAdmin', {
      errors,
      name,
      phone,
      accName,
      accNo,
      bank,
      amountB
    });
  } else {
    let myId = userId;
    let paired = []
    let amount = amountB

    var user = {
      paring: false
    }
    User.update({ _id: myId }, user, function (err, user) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    User.findOne({ _id: myId }).then(user => {
      if (user.status === false) {

        errors.push({ msg: 'you need to register your account, pay 1000 to this Account Number' });
        res.render('pay', {
          errors,

        });
      } else if (user.blocked === true) {

        errors.push({ msg: 'Your Account have been blocked, pay 2000 to this Account Number' });
        res.render('blocked', {
          errors,

        });

      }
      else {

        amount = parseInt(amountB) + (parseInt(amountB) / 100) * 50


        let secR = amount.toString()[1];
        let threeR = amount.toString()[2];
        console.log(amount, secR, threeR)

        if (secR !== '5' && threeR === '5') {
          amount = amount - 2500
          console.log(amount, secR, threeR)

          let amount2 = 2500

          const withdraw = new WithdrawBox2({
            name,
            phone,
            accName,
            accNo,
            bank,
            myId,
            paired,
            amount2
          });


          withdraw
            .save()
            .then(withdraw => {
              console.log(withdraw)
            })
            .catch(err => console.log(err));

        }


        const withdraw = new WithdrawBox({
          name,
          phone,
          accName,
          accNo,
          bank,
          myId,
          paired,
          amount
        });


        withdraw
          .save()
          .then(withdraw => {
            req.flash(
              'success_msg',
              'You will be paired shortly'
            );

            res.redirect('/users/0000/admin');
          })
          .catch(err => console.log(err));

      }
    });





  }

});



module.exports = router;
