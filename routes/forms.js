const express = require( 'express' );
const Form = require( '../app/models/form' );
const Attribute = require( '../app/models/attribute' );
const FormAttribute = require( '../app/models/formAttribute' );
const storeFormSchema = require( '../app/schemas/forms/store' );
const AttributeModels = require('../app/enums/attributes/attributeModels');

const router = express.Router();

router.post( '/', async ( req, res ) =>
{
    try {
        const input = req.body;
        await storeFormSchema.validateAsync( input );

        const form = await new Form( input );
        const savedForm = await form.save();

        res.send( {
            status: 0,
            data: savedForm,
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

router.get('/', async ( req, res ) => {
    try
    {
        const forms = await Form.find();

        res.send( {
            status: 0,
            data: forms,
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

router.get('/:form_id', async ( req, res ) => {
    try
    {
        const { form_id } = req.params;

        if ( !form_id )
        {
            throw new Error( 'form_id is required' );
        }

        const form = await Form.findById( form_id );

        if ( !form )
        {
            throw new Error( 'Form not found' );
        }

        res.send( {
            status: 0,
            data: form,
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


router.get('/attributes', async ( req, res ) => {
    try
    {
        const attributes = await Attribute.find({ model: AttributeModels.FORM } );

        res.send( {
            status: 0,
            data: attributes,
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

router.get('/:form_id/attributes', async ( req, res ) => {
    try
    {
        const { form_id } = req.params;

        if ( !form_id )
        {
            throw new Error( 'form_id is required' );
        }

        const formAttributes = await FormAttribute.find({ form_id: form_id } );

        res.send( {
            status: 0,
            data: formAttributes,
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

router.post('/:form_id/submit', async ( req, res ) => {
    try
    {
        const { form_id } = req.params;

        if ( !form_id )
        {
            throw new Error( 'form_id is required' );
        }

        const form = await Form.findById( form_id );

        if ( !form )
        {
            throw new Error( 'Form not found' );
        }

        const formAttributes = await FormAttribute.find({ form_id: form_id } );

        let prompt = "";

        for ( const formAttribute of formAttributes )
        {
            const attribute = await Attribute.findById( formAttribute.attribute_id );

            if ( attribute )
            {
                prompt += `${ attribute.persian_name }: ${ formAttribute.value }، `;
            }
        }

        res.send( {
            status: 0,
            data: prompt,
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
