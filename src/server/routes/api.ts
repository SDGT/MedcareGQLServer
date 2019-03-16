import express from 'express';
 const router = express.Router();

/* GET api listing. */
router.get('/', (req:any, res:any) => {
  res.send('api works');
});



// define a route handler for the default home page
router.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

router.get('/test',function(req,res,next){
    res.send({"hello":"shaikhriyaz"});
  })


export default router;




