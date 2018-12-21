import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!!'
    })
})

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const server = Server.instance;

    const payload = {
        cuerpo,
        de
    }

    server.io.emit('mensaje-nuevo', payload)

    res.json({
        ok: true,
        cuerpo,
        de
    })
})

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;
    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {
    
    const server = Server.instance;

    server.io.clients((err:any, clientes: Socket) => {
         if ( err ) {
            return res.json({
                ok: false,
                err
            })
         }

         res.json({
            ok: true,
            clientes
         });
    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {
    

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
     });


});

export default router;