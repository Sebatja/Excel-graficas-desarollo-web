const { Router} = require('express');
const router = Router();

// Excel
const XLSX = require('xlsx');

const multer = require('multer');

const mimeType = require('mime-types');
const { callbackPromise } = require('nodemailer/lib/shared');
// console.log("Arreglo :" + result);
//  var arregloCorreos = leerExcel('BaseDeDatos.xlsx');

//  console.log(arregloCorreos);

function leerExcel(ruta){
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;

    const sheet = workbookSheets[0];
    const dataExel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // console.log(dataExel);
    return dataExel;
}

var nombreArchivo = "";

const storage = multer.diskStorage({
    destination :'',
    filename : function (req,file,cb){
        nombreArchivo = Date.now() + file.fieldname;
    cb("", nombreArchivo + "." + mimeType.extension(file.mimetype));
        
    


  

     
    
    }
    
 
})
const upload = multer({
  storage : storage

})
 var excel;
router.post('/send-email',upload.single('archivo'), (req,res) => {

 
   excel = leerExcel(nombreArchivo + "." + "xlsx");





  //  res.redirect('back')
 
    
});

router.get('/productos', (req,res) =>{
  console.log(excel)
 res.json(excel);

});



module.exports = router;