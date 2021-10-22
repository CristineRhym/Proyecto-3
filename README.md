<img src="" alt="">

# Proyecto Camping La Posidonia

**Camping La Posidonia** es un lugar donde poder oxigenarte y reconectar de nuevo con tu naturaleza mas primaria.

Tal como esta planta *("especie endémica del Mar Mediterraneo que no esta presete en ningún otro lugar del mundo")* y su cercanía con ella, al ofrecer unas vistas a ese horizonte marino teñido de color posidonia, es un parajede puesta, alimento y refugio de todo aquel que quiera reencontrarse.

Puedes acceder a la web a través de este enlace ()

## Descripción funcional
***

Mediante la web **Camping La Posidonia**, el usuario tiene acceso a toda la información relativa a los alojamientos y experiencias que ofrece un lugar como este.
También puede reservar el alojamiento que más adecue a sus preferencias en las fechas que tenga disponibilidad, consultar y modificar toda su información como usuario mediante un perfil privado previamente creado.

## Dependencias
***
Desde la terminal, usa el siguiente comando:

```
npm install
```
* bcrypt: ^5.0.1,
* dotenv: ^10.0.0,
* express: ^4.17.1,
* jsonwebtoken: ^8.5.1,
* mongoose: ^5.12.13
## Descripción técnica (Direccionamiento)
***
USUARIOS:

> `/users`

GET:    
/ 

POST:   
/signup     
/login

ALOJAMIENTOS:

> `/apartments`

GET:    
/   
/find   

POST:   
/

PUT:    
/update

RESERVAS:

> `/bookings`

GET:    
/   
/user
        
POST:   
/createBook     

DELETE:     
/removeBooking/:id

PUT:    
/updateBooking  
/updateFinish

## Tecnologías
***
* `JavaScript`
* `Node JS`
* `MongoAtlas`
* `Bycrypt` y `JsonWebToken`

## Versiones
***
V 1.0 - Entregable presentado.

## TO DO
***
* Añadir validaciones
* Crear admin
* Añadir rutas de experiecias
* Imagenes apartamentos



