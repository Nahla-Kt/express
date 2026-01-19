import { Router } from "express";
import Auth from "./middleware/auth.js"

// import { addData,getData } from "./reqhandler.js";
import * as rh from './reqhandler.js'
const router =Router()

router.route('/adddata').post(Auth,rh.addData)
router.route('/getdata').get(rh.getData)
router.route('/getsingledata/:id').get(rh.getsingleData)
// router.route('/update/:id').put(rh.updateData)
router.route('/update').put(Auth,rh.updateData)
router.route('/delete/:id').delete(rh.deleteOne)
router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)

router.route('/updateproduct/:id').put(Auth,rh.updateProduct)

export default router
