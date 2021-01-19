// routes/index.js

module.exports = function(app, Taxi)
{
    // GET ALL BOOKS
    app.get('/api/taxis', function(req,res){
        Taxi.find(function(err, taxis){
            if (err) return res.status(500).send({error: 'database failure'});
            res.json(taxis);
        })
    });

    // CREATE BOOK
    app.post('/api/taxis', function(req, res){
        var taxi = new Taxi();
        taxi.location = req.body.location;
        taxi.person = req.body.person;
        taxi.when =req.body.when;
        taxi.save(function(err){
            if (err){
                console.error(err);
                return;
            }
            console.log("post success");
            res.json(taxi);
        })
    });

    // UPDATE THE BOOK
    app.put('/api/taxis/:taxi_id', function(req, res){

        console.log(req.params.taxi_id);
        Taxi.findById(req.params.taxi_id, function(err, taxi){
            if(err) {
                console.log("err1");
                return res.status(500).json({ error: 'database failure' });
            }
            if(!taxi) {
                console.log("err2");
                return res.status(404).json({ error: 'taxi not found' });
            }
    
            taxi.person-=1;
            // taxi.arrayUser = 
            
            // taxi.araryUser.push(req.params.faceBookId);
            // console.log(req.params.faceBookId);
    
            taxi.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                else{
                    console.log("join success");
                    res.json();
                }
            });
    
        });
    });

    // // DELETE BOOK
    // app.delete('/api/books/:book_id', function(req, res){
    //     Book.remove({ _id: req.params.book_id }, function(err, output){
    //         if(err) return res.status(500).json({ error: "database failure" });
    
    //         /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
    //         if(!output.result.n) return res.status(404).json({ error: "book not found" });
    //         res.json({ message: "book deleted" });
    //         */
    
    //         res.status(204).end();
    //     })
    // });

}