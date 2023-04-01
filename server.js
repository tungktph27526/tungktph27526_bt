const express = require('express')
const mongoose = require('mongoose')
const uri = 'mongodb+srv://tungktph27526:kttung2609@cluster0.mdas35v.mongodb.net/cp17301?retryWrites=true&w=majority'
const expressHbs = require('express-handlebars')
const nhanvienModel = require('./nhanvienModel')
const mongodb = require('mongodb')
const app = express()
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/"
}))
app.set('view engine', '.hbs')
app.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri)
        const listNV = await nhanvienModel.find().lean()
        res.render('listMongo', { dataNV: listNV })
    } catch (error) {
        console.log(error);
    }
})
app.get('/add_nv', async(req, res) =>{
  let name = req.query.tennv;
  let age = req.query.tuoinv
  let salary = parseInt(req.query.luongnv)
  let nv = new nhanvienModel({
    ten: name,
    tuoi: age,
    luong: salary
  })
  console.log(req.body);
    try {
        await nv.save()
        res.redirect('/')
    } catch (error) {
    }
})
app.get('/delete_nv', async (req, res) => {
  let idNV = req.query.idNV
  try {
      nhanvienModel.collection.deleteOne({ _id: new mongodb.ObjectId(`${idNV}`) })
      res.redirect('/')
  } catch (error) {
  }
  console.log(idNV);
})
app.get('/up_nv', async (req, res) => {
  let idUp = req.query.idEdit
  // // let nvNew = await nhanvienModel.find({_id: new mongodb.ObjectId(`${idUp}`)})
  console.log(idUp);
  try {
      const listNV = await nhanvienModel.find().lean()
      let nvUp = await nhanvienModel.find({ _id: new mongodb.ObjectId(`${idUp}`) }).lean()
      res.render('updateList', { dataNV: listNV, nv: nvUp[0], index: idUp })
  } catch (error) {
      console.log(error);
  }
})
app.get('/up_nv/update', async (req, res) => {
  let name = req.query.tennv
  let age = req.query.tuoinv
  let salary = parseInt(req.query.luongnv)
  let idNV = req.query.idNVien
  try {
      await mongoose.connect(uri)
      await nhanvienModel.collection.updateOne({ _id: new mongodb.ObjectId(`${idNV}`)}, { $set: { ten: name, tuoi:age, luong: salary } })
      res.redirect('/')        
  } catch (error) {
      
  }
})
app.listen(8000, (req, res) => {
    console.log("Dang chay");
})