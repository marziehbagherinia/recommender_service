const express = require( 'express' );
const Attribute = require( '../app/models/attribute' );
const storeAttributeSchema = require( '../app/schemas/attributes/store' );

const router = express.Router();

router.post( '/', async ( req, res ) =>
{
    try {
        const input = req.body;
        await storeAttributeSchema.validateAsync( input );

        const attribute = await new Attribute( input );
        const savedAttribute = await attribute.save();

        res.send( {
            status: 0,
            data: savedAttribute,
        } );
    }
    catch ( error )
    {
        res.status( 400 ).send( {
            status: 1,
            data: error
        } );
    }
} );

module.exports = router;
