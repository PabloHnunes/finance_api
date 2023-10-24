import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

function isValidEmail(value: string): boolean {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
}

@ValidatorConstraint({ name: 'customValidate', async: false })
export class ValidateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const type: string = args.constraints[0];

    if (type === 'string') {
      return typeof value === 'string' && value.trim() !== '';
    } else if (type === 'number') {
      return typeof value === 'number' && !isNaN(value) && value !== null;
    } else if (type === 'email') {
      return isValidEmail(value) && value.trim() !== '';
    } else if (type === 'boolean') {
      return typeof value === 'boolean' && value !== null;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const type: string = args.constraints[0];

    if (type === 'string') {
      return `Campo '$property' deve ser uma string não vazia.`;
    } else if (type === 'number') {
      return `Campo '$property' deve ser um número válido não vazio.`;
    } else if (type === 'email') {
      return `Campo '$property' deve ser um endereço de e-mail válido não vazio.`;
    } else if (type === 'boolean') {
      return `Campo '$property' deve ser um booleano válido não vazio.`;
    } else if (type === 'file_type') {
      return `Campo '$property' deve ser uma dessas opções listadas: pdf, jpeg, png.`;
    }

    return `Campo '$property' com tipo de validação não suportado.`;
  }
}

export function IsValidator(
  type: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidator',
      target: object.constructor,
      constraints: [type],
      propertyName: propertyName,
      options: validationOptions,
      validator: ValidateConstraint,
    });
  };
}
