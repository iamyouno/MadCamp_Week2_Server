// routes/index.js

module.exports = function(app, Contact)
{
    // GET ALL CONTACTS
    app.get('/api/contacts/:facebookId', function(req,res){
        // Contact.find(function(err, contacts){
        Contact.find({facebookId : req.params.facebookId}, function(err, contacts){
            if (err) return res.status(500).send({error: 'database failure'});
            console.log("connected");
            res.json(contacts);
        });
    });

    // CREATE BOOK
    app.post('/api/contacts', function(req, res){
        var contact = new Contact();
        contact.name = req.body.name;
        contact.number = req.body.number;
        contact.facebookId = req.body.facebookId;
        console.log("create contact")

        contact.save(function(err){
            if (err){
                console.error(err);
                return;
            }
            console.log("saved complete");
            res.json(contact)
        })
    });

    // UPDATE THE BOOK
    app.put('/api/contacts/:contact_id', function(req, res){
        Contact.findById(req.params.contact_id, function(err, contact){    
            if(req.body.name) contact.name = req.body.name;
            if(req.body.number) contact.number = req.body.number;
    
            contact.save(function(err){
                if(err) console.log("failed to update");
                else {
                    console.log("contact updated"); 
                    res.json();
                }
            });
        });
    });

    // DELETE Contact
    app.delete('/api/contacts/:contact_id', function(req, res){
        Contact.deleteOne({_id: req.params.contact_id }, function(err, output){
            if(err) console.log("delete fail")
            else {
                console.log("delete success");
                res.json();
            }
        })
    });

}