const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
      try {
            let data = req.body

            let { name, email, password, role } = data

            if (!name) {
                  return res.status(400).send({ status: false, message: "please enter your name" })
            }
            if (!email) {
                  return res.status(400).send({ status: false, message: "please enter your email" })
            }
            let verifyEmail = await userModel.findOne({ email: email })
            if (verifyEmail) {
                  return res.status(400).send({ status: false, message: "email is already exist, please enter different email" })
            }
            if (!password) {
                  return res.status(400).send({ status: false, message: "please enter your password" })
            }
            if (role) {
                  if (!(role == 'Admin' || role == 'Student')) {
                        return res.status(400).send({ status: false, message: "please enter your correct role(Student or Admin)" })
                  }
            }

            let savedData = await userModel.create(data)

            return res.status(201).send({ status: true, message: "Account successfully created", data: savedData })
      }
      catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

const loginUser = async (req, res) => {
      try {
            let data = req.body

            let { email, password } = data

            if (!email) {
                  return res.status(400).send({ status: false, message: "please enter your email" })
            }
            let verify = await userModel.findOne({ email: email })
            if (!verify) {
                  return res.status(400).send({ status: false, message: "please enter your correct email" })
            }
            if (verify.password != password) {
                  return res.status(400).send({ status: false, message: "please enter your correct password" })
            }

            let objAdmin
            if (verify.role == "Admin") {
                  let tokenAdmin = jwt.sign({ userId: verify._id, role: verify.role }, "Sanhil", { expiresIn: '1h' })
                  objAdmin = { role: verify.role, tokenAdmin }
            }

            let objStudent
            if (verify.role == "Student") {
                  let tokenStudent = jwt.sign({ userId: verify._id, role: verify.role }, "Sanhil", { expiresIn: '1h' })
                  objStudent = { role: verify.role, tokenStudent }
            }
            if (objAdmin) {
                  return res.status(200).send({ status: true, message: "Account successfully login", data: objAdmin })
            }
            if (objStudent) {
                  return res.status(200).send({ status: true, message: "Account successfully login", data: objStudent })
            }
      }
      catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

module.exports = { createUser, loginUser }