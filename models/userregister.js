const mongoose = require('mongoose');

// Create a schema for the user
const certificateSchema = new mongoose.Schema({
  fleeceType: {
    type: String,
    required: false,
  },
  fiberLength: {
    type: String,
    required: false,
  },
  stapleLength: {
    type: String,
    required: false,
  },
  fiberFineness: {
    type: String,
    required: false,
  },
  massOfDrySpecimen: {
    type: String,
    required: false,
  },
  massOfUndriedSpecimen: {
    type: String,
    required: false,
  },
  massOfAbsorbedWater: {
    type: String,
    required: false,
  },
  fiberDiameter: {
    type: String,
    required: false,
  },
  burrContent: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});
const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: '',
  },
  progress: {
    type: Number,
    required: false,
    default: 0,
  },
  lastUpdatedBy: {
    type: String,
    required: false,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  certificate: {
    type: String,
    required: false,
    default: "",
  }
});
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true 
      },
      name: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['farmer', 'seller', 'warehouse', 'teacher', 'transport', "service" ],
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      progress: {
        type: Number,
        default: 0
      },
      experience: {
        type: String,
        default: "none"
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      },
      batches: {
        type: [batchSchema],
        default: []
      }
    });
    


    
    // Middleware to verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}




// Middleware to verify token and check user role
function verifyTokenAndRole(role) {
  return function (req, res, next) {
    // Get token from cookies or wherever it's stored
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Check user role
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      // Attach the decoded user information to the request for later use if needed
      req.user = decoded;

      // If role matches, proceed to the next middleware or route handler
      next();
    });
  };
}

    

// Create a model using the schema
const Userregister = mongoose.model('Userregister', userSchema);

module.exports = Userregister;

