export const html = (content: TemplateStringsArray, ..._: unknown[]) => {
    const str = content.reduce((acc, str, i) => acc + str + (_[i] || ''), '');
    return str.replace(/\n/g, '').replace(/\s{2,}/g, '');
};

// TODO: Logo insertion
// => <img src="data:image/jpg;base64,{{base64-data-string here}}" />
