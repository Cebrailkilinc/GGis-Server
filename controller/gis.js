import shapefile from "shapefile";

export const readFile = (req, res) => {
  const filePath = "İl_Sınırı.shp";
  
 const data = shapefile
  .read(filePath)
  .then(function (result) {            
    return result.features
  })
  .catch(function (err) {
    res.status(500).send({ error: err });
  }); 
  res.status(200).send(data)
};
