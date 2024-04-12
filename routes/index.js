const express = require('express');
const axios = require('axios');
const Joi = require('joi');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello!');
});

const userDataSchema = Joi.object({
    age: Joi.number().integer().optional(),
    gender: Joi.string().optional(),
    preferred_learning_format: Joi.string().optional(),
    learning_goal: Joi.string().optional(),
    current_job: Joi.string().optional(),
    current_education_degree: Joi.string().optional(),
    current_education_field: Joi.string().optional(),
    interest_areas: Joi.array().items(Joi.string()).optional(),
    general_preferences: Joi.string().optional() // This is an optional description field
}).or('age', 'gender', 'preferred_learning_format', 'learning_goal', 'current_job', 'current_education_degree', 'current_education_field', 'interest_areas', 'general_preferences');

router.post('/message', async (req, res) =>
{
    try {
        // Validate the request data against the schema
        await userDataSchema.validateAsync(req.body);

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const url = 'https://api.openai.com/v1/chat/completions';
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "شما در نقش یک مشاور تحصیلی و کاری در یک مجموعه آموزشی فعال هستید که دوره های مختلفی را برگزار می‌کند. دوره‌های موجود شامل برنامه‌نویسی، معامله‌گری در بازارهای مالی، بازاریابی، فروش تلفنی و تولید محتوا هستند. شما باید با توجه به نیاز و تمایلات و ویژگی های هر فرد، دوره یا دوره‌هایی را که بیشترین مزیت برای آنها را دارد، معرفی کنید. برای هر دوره ای که پیشنهاد می دهید حداکثر یک پاراگراف توضیح دهید."
                },
                {
                    "role": "user",
                    "content": `سن: ${req.body.age}، جنسیت: ${req.body.gender}، نوع آموزش ترجیحی: ${req.body.preferred_learning_format}، هدف از آموزش: ${req.body.learning_goal}، شغل فعلی: ${req.body.current_job}، مقطع تحصیلی: ${req.body.current_education_degree}، رشته تحصیلی: ${req.body.current_education_field}، حوزه های مورد علاقه: ${req.body.interest_areas} و توضیحات تکمیلی کاربر: ${req.body.general_preferences}`
                }
            ]
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        res.send( {
            status: 0,
            data: response.data.choices[0].message.content
        } );
    }
    catch (error)
    {
        // If validation fails, send a 400 Bad Request response with the error message
        res.status(400).send( {
            status: 1,
            data: error
        });
    }
});

module.exports = router;
