const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const About = require('../models/About');
const Apartment = require('../models/Apartment');
const Tour = require('../models/Tour');
const Intro = require('../models/Intro');
const Transfer = require('./../models/Transfer');
const TourCategory = require('./../models/TourCategory');


module.exports = {


index(req, res){

    let promisesAll = [

        Tour.find({status: 'Public'}).sort({ date: -1}).exec(),
        Intro.find({ status: 'Public'}).exec(),
        Contact.find({}).exec()

    ];

    Promise.all(promisesAll)
    .then( ([tours, intro, contact]) => {
            res.render('index/welcome', { tours: tours, intro: intro, contact });          
    });
    
}, 

about(req, res){
    About.findOne({})
        .then( about => {
            res.render('index/about', { about: about });
        })  
},

tours(req, res){

    Tour.find({status: 'Public'}).sort({ date: -1})
    .then( (tours) => {
            res.render('index/tours', { tours: tours });          
    });
   
},

tourShow(req, res){

    const id = req.params.id;
    
        Tour.findById({ _id: id })
            .populate('subcontact')
            .then( tour => {
                res.render('index/tour-show', { tour: tour });   
            }); 
    },

 transfer(req, res) {

    let promisesAll = [
        
                Transfer.find({status: 'public'}).sort({from: 1}).exec(),
                TourCategory.find({status: 'Public'}).sort({ date: 1}).exec(),  
            ];
        
            Promise.all(promisesAll)
            .then(([transfers, tourCategories]) => {
                //res.send(tourCategories);
                res.render('index/transfers', {transfers: transfers, tourCategories: tourCategories });
                
            });    
 },   


contact(req, res){

    Contact.findOne({})
        .then( contact => {
            res.render('index/contact-us', { contact: contact });
        });
    
},


maps(req, res){

    res.render('index/maps');

},


geocode(req, res){
    res.render('index/geocode');
}


}