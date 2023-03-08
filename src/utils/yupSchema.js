import * as yup from 'yup';
export const loginYup = yup.object().shape({
    email: yup.string().required('').email('! Email format is incorrect.'),
    password: yup
        .string()
        .required('')
        .max(15, 'Password must be 15 characters or less.')
        .min(8, 'Password must be at least 8 digits.')
        .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, 'Must contain special characters.'),
});
