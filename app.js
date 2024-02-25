//use express to create a
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

//create a new express app
const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Middleware here... 😀');
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  //console.log(req.params);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.params);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  );
  (err) => {
    res.status(201).json({
      statusbar: 'success',
      data: {
        tour: newTour,
      },
    });
  };
};

const updateTour = (req, res) => {
  console.log(req.params);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  console.log(req.params);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};

//USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  })
}

// 3) ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


