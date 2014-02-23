module.exports = exports = function(app, db) {

    //404
    app.use( function ( req, res, next ) {
        res.status( 404 );

        if(req.accepts('html')) {
            return res.render("./copyTemplate", {
                title: "Error 404",
                subtitle: 'This page is GONE.'
            });
        }

        if(req.accepts('json')) {
            return res.json({ eror: "not found, this in json"});
        }

        //default
        res.type('txt');
        res.send('Error 404, could not find page.');
    });

    //500
    app.use( function (err, req, res, next) {
        console.error('error at %s\n', req.url, err);
        res.send(500, "error code 500, oh snap");
    });
};

