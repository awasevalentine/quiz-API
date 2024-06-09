/* eslint-disable prettier/prettier */

export const FormatError = (error) => {
  console.log('the error log:: ', error);
  const message = {
    message: null,
    statusCode: null,
    path: null,
  };

  const lowerCaseMessage = error?.message?.toLowerCase()
  const lowerCaseStatus = error?.extensions?.code?.toLowerCase()
  if (lowerCaseMessage.includes('duplicate key')) {
    const keyValuePair = error?.message.split('dup key: { ')[1];
    const key = keyValuePair.split(':')[0].trim();

    message.message = `${capitalizeFirstLetter(key)} already exist`;
    message.statusCode = 409;
    message.path = error?.path;
  }
  else if (lowerCaseStatus === 'bad_user_input') {
    const fieldMatch = error?.message.match(/at "([^"]+)"/);
    const field = fieldMatch ? fieldMatch[1].split('.').pop() : '';

    const typeMatch = error?.message.match(
      /cannot represent a non (\w+) value/,
    );
    const expectedType = typeMatch ? typeMatch[1] : '';
    if (field && expectedType) {
      message.message = `${capitalizeFirstLetter(
        field,
      )} requires a ${expectedType} value.`;
      message.statusCode = 400;
      message.path = error?.path;
    } else {
      message.message = 'Invalid input format.';
      message.statusCode = 400;
      message.path = error?.path;
    }
  }
  else if(lowerCaseMessage.includes("not found")){
    message.message = error?.message;
    message.statusCode = 404;
    message.path = error?.path
  }
  else if(lowerCaseMessage.includes("CastError: Cast to ObjectId".toLowerCase())){
    const match = error?.message.match(/_id:\s*'([^']+)'/);
    if (match && match[1]) {
        message.message = `Provided ObjectId ${match[1]} is invalid`;
        message.statusCode = 400;
        message.path = error?.path
    }
  }
  else{
    message.message = error?.message;
    message.statusCode = 500;
    message.path = error?.path
  }

  return message;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
