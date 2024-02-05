import { css, html } from '../../src/utils/templateStrings';

describe('utils/templateStrings.ts', () => {
    it('html``', () => {
        const str = html`
            <html>
                <body>
                    <h1>Bienvenue sur ${`Cinévoraces`} !</h1>
                </body>
            </html>
        `;

        expect(str).toBe('<html><body><h1>Bienvenue sur Cinévoraces !</h1></body></html>');
    });

    it('css``', () => {
        const str = css`
            .main {
                background-color: red;
            }
        `;

        expect(str).toBe('<style>.main {background-color: red;}</style>');
    });
});
