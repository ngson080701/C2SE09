import { Customer } from "../models/Customer/Customer.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import axios from "axios";

// *Useful for getting environment vairables
dotenv.config();

// Register for customer don't have account

export const RegisterForCustomer = async (req, res) => {
  const responseType = {
    status: 200,
    statusText: 'Success',
  };
  const input = req.body;
  console.log(input);
  try {
    const user = await Customer.findOne({ Email: input.Email });

    if (user) {
      responseType.status = 300;
      responseType.message = "Email is already registered!";
      return res.json(responseType);
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(input.Password, salt);

      const newCustomer = new Customer({
        Name_Customer: input.Name_Customer,
        Telephone: input.Telephone,
        Email: input.Email,
        Password: hashPassword,
      });

      // Save the new customer to the database
      const saveCustomer = await newCustomer.save();
      responseType.message = "Register Successfully";
      responseType.value = saveCustomer;

      return res.json(responseType);
    }
  } catch (error) {
    console.log(error);
    responseType.message = "An error occurred during registration";
    responseType.status = 500; // Internal Server Error
    return res.json(responseType);
  }
};

// Login for customer have account

export const LoginForCustomer = async (req, res) => {
  const responseType = {};
  // if (!req.body.token) {

  //   // responseType.status = 400;
  // }
  try {
 
      const user = await Customer.findOne({
        Email: req.body.Email,
      });
      if (!user) {
        responseType.status = 300;
        responseType.message = "Email was wrong!";
      }

      try {
        const match = bcryptjs.compare(req.body.Password, user.Password);
        if (!match) {
          responseType.status = 301;
          responseType.message = "Password not match!";
        } else {
          responseType.status = 200;
          responseType.message = "Login Successfully";
          responseType.value = user;
        }
      } catch (err) {
        console.log(err);
      }
    // } 
    // else {
    //   responseType.message = "reCaptcha is invalid";
    // }
  } 
  catch (error) {
   
    responseType.status = 400;
  }

  res.json(responseType);
};

export const changePasswordWithOldPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const pass = req.body.Password;
  const id = req.params.id;
  const responseType = {};

  try {
    const user = await Customer.findById({ _id: id });
    if (!user) {
      responseType.message = "Customer not found";
    }
    // valid old Password
    const check = await bcryptjs.compare(pass, user.Password);
    if (!check) {
      responseType.message = "Old password is wrong";
      responseType.status = 500;
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const newPass = await newPassword;
      const hashPassword = bcryptjs.hashSync(newPass, salt);
      // update password with new pass word
      user.Password = hashPassword;
      const updated = await user.save();
      responseType.message = "Password change successfully";
      responseType.status = 200;
      responseType.value = updated;
    }
  } catch (err) {
    responseType.message = "Update password was failed";
  }

  res.json(responseType);
};