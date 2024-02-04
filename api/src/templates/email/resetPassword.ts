import { EmailTemplate } from '@src/classes';
import { html } from '../../utils/templateStrings';
import { style } from '../style';

const subject = 'Bienvenue sur Cinévoraces !';

const content = html`
    <div class="main">
        <div class="container">Test</div>
    </div>
`;

export default new EmailTemplate(subject, content, [style]);
