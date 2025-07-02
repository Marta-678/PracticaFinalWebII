require ('dotenv').config()
const express = require('express')
const cors = require('cors')


const routersUsers = require('./router/user.js')
const dbConnect = require('./configuracion/mongo.js')


dbConnect()
const app=express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

app.use("/api/users", routersUsers);






// env_example
//user pass tiene 3 intentos. 
//el cliente hace un pos de cliente y pass, coges el usuario del modelo. cifras el pass, generar un clave de 6 ddigitos y guardar en usuario.
//el servidor manda un email, no es cierto. se pone en consol.log .
// mandas el usuario con el pass y tiene que comprobar que el usuario corresponde con ese 
