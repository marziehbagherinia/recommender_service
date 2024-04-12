const express = require('express');
const FromAttribute = require('../app/models/formAttribute');
const {storeFormAttributeSchema, storeFormAttributeSchemaValueType} = require('../app/schemas/formAttributes/store');

const router = express.Router();

router.post( '/', async ( req, res ) =>
{
    try {
        const input = req.body;
        await storeFormAttributeSchema.validateAsync( input );

        const dynamicSchema = await storeFormAttributeSchemaValueType( input.attribute_id );
        await dynamicSchema.validateAsync({value: input.value});

        const fromAttribute = await new FromAttribute( input );
        const savedFromAttribute = await fromAttribute.save();

        res.send( {
            status: 0,
            data: savedFromAttribute,
        } );
    }
    catch ( error )
    {
        console.error(error);
        res.status( 400 ).send( {
            status: 1,
            data: error
        } );
    }
} );

module.exports = router;
