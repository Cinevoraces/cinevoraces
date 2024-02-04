import { EmailTemplate } from '@src/classes';
import { html } from '../../utils/templateStrings';
import { style } from '../style';

const subject = 'Bienvenue sur Cinévoraces !';

const content = html`
    <div class="main">
        <div class="container">
            <h1>Bienvenue sur Cinévoraces.fr, votre <span class="emphasis">ciné-club</span> virtuel !</h1>
            <p>
                Vous avez bien reçu cet email, ce qui signifie que votre inscription est presque terminée. Cliquez sur
                le lien ci-dessous pour confirmer votre inscription.
            </p>
            <a href="{{ url }}">Confirmer mon inscription</a>
        </div>
    </div>
`;

export default new EmailTemplate(subject, content, [style]);
