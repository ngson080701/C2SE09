import express from "express";
const router = express.Router();
import {
  RegisterForCustomer,
  LoginForCustomer,
  
} from "../app/controllers/Auth.controller.js";

// Sign up for customer don't have account
router.post("/register", RegisterForCustomer);

// Login for customer
router.post("/login_customer", LoginForCustomer);



export default router;
