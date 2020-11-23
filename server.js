const express = require ("express")
const app = express() 
const bodyParser = require('body-parser'); 
const albumsData = require("./albums.json");
const fs = require('fs');
  app.get("/albums", function (req, res) {
    res.send(albumsData);
  });
  app.get("/albums/:albumId", function (req, res) {
    const Id = req.params.albumId
    // req.params.albumId will match the value in the url after /albums/
    console.log(req.params.albumId);
    // now we can use the value for req.params.albumId to find the album requested
    // how do we "find" something in an array
  const newalbum = albumsData.find(q => q.albumId == Id);
  // finish the code yourself - it should end with res.send(album) where album is the single album you found  based on the id
  res.send(newalbum)
    // res.send(albumsData)
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/albums", function(req, res){
    let rawdata = fs.readFileSync('albums.json');
    let allAlbum= JSON.parse(rawdata); 
        let newAlbum = req.body; 
    console.log(newAlbum);
    newAlbum.albumId = allAlbum.length.toString();
    allAlbum.push(newAlbum);
    res.send(allAlbum);   
});
app.delete("/albums/:albumId", function (req, res) {
    const Id = req.params.albumId
    const deleteAlbum = allAlbum.find(q => q.albumId == Id)
    if(deleteAlbum){
        let index = allAlbum.indexOf(deleteAlbum);
    allAlbum.slice(index, 0);
    res.send(deleteAlbum);  
    }
    else {
        res.send("Not available here");
    }
    saveAlbum(allAlbum);
});
const allAlbum = () => {
    // using global variable "fs" ^ defined at the top part of server.js
    let rawdata = fs.readFileSync('albums.json');
    return JSON.parse(rawdata);
};
const saveAlbum = albums => {
    let data = JSON.stringify(albums);
    fs.writeFileSync('albums.json', data);
};
  app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
  });