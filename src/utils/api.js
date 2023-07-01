// Function to encode the parameter values
export function encodeParams(obj) {
    const encodedParams = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
      }
    }
    return encodedParams.join('&');
  }