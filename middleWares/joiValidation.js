import Joi from "joi";

//joi validation for user
export const userJoi = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
});


//joi validation for product
export const productJoi = Joi.object({
    title: Joi.string().min(3).max(30).required(),

    description:Joi.string().min(3).max(50).required(),

    price:Joi.number().min(3).max(30).required(),

    image:Joi.string().min(3).max(50).required(),

    category:Joi.string().min(3).max(50).required(),
})