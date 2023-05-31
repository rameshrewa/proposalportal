import * as yup from 'yup';

import { identityNumberRegexes } from 'forms/donationData';

export const personalDetailsValidation = yup.object().shape({
  name: yup.string().required('This field is required').matches(
    /^[a-z\d\-_\s]+$/i,
    "allowed only alpha numeric"
  ).max(120, 'Only allowed maximum 120 characters'),
  fathers_occupation: yup.string().required('This field is required').matches(
    /^[a-z\d\-_\s]+$/i,
    "allowed only alpha numeric"
  ).max(120, 'Only allowed maximum 120 characters'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('This field is required')
    .max(120, 'Only allowed maximum 120 characters'),
  phone: yup.string().typeError('This field is required').required('This field is required'),
  city: yup.string().required('This field is required').max(60, 'Only allowed maximum 60 characters'),
  state: yup.string().required('This field is required').max(60, 'Only allowed maximum 60 characters'),
  address: yup.string().required('This field is required').max(120, 'Only allowed maximum 120 characters'),
  pincode: yup.string().required('This field is required').max(10, 'Only allowed maximum 10 character'),
  citizenship: yup.mixed().typeError('Select a valid citizenship').required('This field is required'),
  identityType: yup.string().required('This field is required'),
  identityNumber: yup.lazy((value) => {
    if (value) {
      return yup
        .string()
        .max(20, 'Only allowed maximum 20 character')
        .when(['identityType'], (identityType, schema) => {
          switch (identityType) {
            case 'Pancard':
              return schema.matches(identityNumberRegexes.Pancard, `Enter a valid Pancard number`);
            case 'Aadhar Card':
              return schema.matches(identityNumberRegexes['Aadhar Card'], `Enter a valid Aadhar card number`);
            default:
              return schema;
          }
        });
    }
    return yup.mixed().notRequired();
  }),
  currencyType: yup.string().required('This field is required'),
  amount: yup
    .number()
    .required('This field is required')
    .typeError('Please enter a valid amount')
    .positive('Please enter a positive number')
    .integer('Number only')
    .nullable(),
  customAmount: yup.mixed().notRequired(),
  saplingCount: yup.lazy((value) => {
    if (value < 1) {
      return yup
        .number()
        .min(1, 'Please contribute at least one Tree')
        .typeError('Please contribute at least one Tree');
    }
    return yup.mixed().notRequired();
  }),
});
