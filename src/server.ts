import express,{Router,Request,Response}from 'express';

import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get('/filteredimage',async(req:Request,res:Response)=>
  {
      // endpoint to filter an image from a public url.
let image_url=req.query.image_url;
//image url must be entered
if (!image_url){
  return res.status(400).send("you must enter the url of the image");
}

//    2. call filterImageFromURL(image_url) to filter the image
try{    
let url_check = new URL(image_url.toString());
if (url_check.protocol=="http"||url_check.protocol=="https"){
  let image_check=await filterImageFromURL(image_url.toString());
  //    3. send the resulting file in the response 
  //    4. deletes any files on the server on finish of the response
return res.status(200).sendFile(image_check,()=>{deleteLocalFiles([image_check])});
}
}
catch(err){
  return res.status(400).send("bad image url ")  ;
}

})


  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();