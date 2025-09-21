// Turns a json file into a continuous, space seperated, string 
export function jsonToText(obj: any): string {
  const parts: string[] = [];

  function iterateOverJson(value: any) {
    if (!value) return;
    if (typeof value === 'string') {
      parts.push(value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      parts.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(iterateOverJson);
    } else if (typeof value === 'object') {
      Object.values(value).forEach(iterateOverJson);
    }
  }
  iterateOverJson(obj);
  return parts.join(' ');
}