export const isValidJsonString = (jsonString: string): boolean => {
  // check if the string is opened with curly brace or machine bracket
  if (jsonString.trim().search(/^([[{]){1}/) <= -1) return false;

  try {
    // try top parse the string to see if its valid JSON
    const parsedJson = JSON.parse(jsonString);

    // if is is an object then for sure is valid
    return typeof parsedJson === 'object';
  } catch (e) {
    // Error trying to parse, so it is not a valid JSON
    return false;
  }
};
