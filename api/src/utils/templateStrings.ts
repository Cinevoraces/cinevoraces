export const html = (content: TemplateStringsArray, ...values: unknown[]) => {
    const str = appendValues(content, values);
    return trim(str);
};

export const css = (content: TemplateStringsArray, ...values: unknown[]) => {
    const str = appendValues(content, values);
    return `<style>${trim(str)}</style>`;
};

const appendValues = (content: TemplateStringsArray, values: unknown[]) =>
    content.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

const trim = (string: string) => string.replace(/\n/g, '').replace(/\s{2,}/g, '');
