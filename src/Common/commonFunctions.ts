import { config } from './commonConfig';
import validator from 'validator';

export const validateForm = (formToValidateValues: any): boolean => {
    const lengthValidation = config.formFieldToCheck.every(currField => {
        return formToValidateValues[currField].length > 0
    })
    const emailValidation = validator.isEmail(formToValidateValues['email']);

    return lengthValidation && emailValidation;
}