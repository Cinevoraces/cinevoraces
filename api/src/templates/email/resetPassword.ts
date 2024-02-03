import { style } from '../style';
import { html } from '../utils';

const subject = 'Bienvenue sur Cinévoraces !';

const content = html`
    <html>
        ${style}
        <body>
            <main>
                <div class="container"></div>
            </main>
        </body>
    </html>
`;

export default { subject, content };
