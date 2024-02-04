import { html } from '../../utils/templateStrings';
import { global } from './styles';

const subject = 'Cinévoraces - Réinitialisation de votre mot de passe';

const content = html`
    <div class="main">
        <div class="container">
            <h1>Réinitialisation de votre mot de passe</h1>
            <p>
                Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour&nbsp;
                créer un nouveau mot de passe.
            </p>
            <a href="{{ url }}">Réinitialiser mon mot de passe</a>
        </div>
    </div>
`;

export default { subject, content, styles: [global] };
