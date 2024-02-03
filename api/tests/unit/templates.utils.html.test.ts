import { html } from '../../src/templates/utils';

describe('templates/utils.ts', () => {
    it('html``', () => {
        const str = html`
            <html>
                <body>
                    <h1>Bienvenue sur Cinévoraces !</h1>
                </body>
            </html>
        `;
        expect(str).toBe('<html><body><h1>Bienvenue sur Cinévoraces !</h1></body></html>');
    });
});
