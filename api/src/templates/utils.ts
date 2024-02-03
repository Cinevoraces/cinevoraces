export const html = (content: TemplateStringsArray, ..._: unknown[]) => {
    const str = content.join('');
    return str.replace(/\n/g, '').replace(/\s{2,}/g, '');
};
