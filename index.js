let express = require('express');
let file = require('path');
let port = 8000;
const db= require('./config/mongoose')

const contact = require('./models/contact')
let app = express();

app.set('view engine','ejs');
app.set('views',file.join(__dirname,'views'));
app.use(express.static('assets'))
app.use(express.urlencoded());

let contactList = [
    {
        name:"Piyush",
        phone:"9650261365"
    },
]


app.get('/',async(req,res)=>
{
    try{
        const ContactList = await contact.find({});
        return res.render('home',
        {   
            title:'My Contact List',
            contact_list:ContactList
        })
    }catch(error)
    {
        console.log(error)
    }
})   
// app.get('/',function(req,res)
    // {
    //        return res.render('home',
    //     {
    //         title:'My Contacts',
    //         contact_list:contactList
    //     });
    //     });

    app.get('/demo',function(req,res)
    {
        return res.render('demo',
        {
            title:'Redirected Page',
        })
    })

    app.post('/contact',function(req,res)
    {
        // contactList.push(req.body)
        contact.create(
            {
                name:req.body.name,
                phone:req.body.phone
            }
        ),function(req,newContact)
        {
            if(err)
            {
                console.log(err)
                return;
            }
            else
            {
            console.log("********",newContact)
            return res.redirect('/')
            }
            
        }
    })


    app.get('/delete-contact/', function (req, res) {
        let id = req.query.id;
      
        contact.findByIdAndDelete(id)
          .then((deletedContact) => {
            console.log('Deleted contact:', deletedContact);
            return res.redirect('back');
          })
          .catch((error) => {
            console.error('Error deleting contact:', error);
            return res.redirect('back');
          });
      });
    // app.get('/delete-contact/',function(req,res)
    // {
    //     console.log(req.query);
    //     console.log(req.query.name)

    //     let id = req.query.id;
    //     let contactIndex = contactList.findIndex(contact => contact.phone == phone)
    //     if(contactIndex != -1)
    //     {
    //         contactList.splice(contactIndex,1)
    //     }
    //     return res.redirect('back')
    // })

    app.listen(port,function(err)
    {
        if(err)
        {
            console.log(err)
        }
        console.log('server is up on port ',port)
    })