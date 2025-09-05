import express from 'express';
import { createUser,getAllUsers, deleteByID, getUserbyID, updateUserbyID } from './controllers/userController.js';
import path from 'path'
import { fileURLToPath } from "url";
import sequelize from './config/db.js';
import { Users } from './models/users.js';
import { body } from 'express-validator';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);



const app = express();
const PORT = 3000;

import methodOverride from "method-override";
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Parse JSON bodies (application/json)
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/users',getAllUsers)

app.post('/users',[
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
  ],createUser)


app.get('/users/:id',getUserbyID)

app.put('/users/:id',[
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
  ],updateUserbyID)

app.delete('/users/:id',deleteByID)

const startserver = async()=>{
   await sequelize.authenticate()

   await Users.sync({ alter: true });

   app.listen(PORT,()=>{
     console.log( `app running on port: ${PORT}`)
})
}

startserver()

