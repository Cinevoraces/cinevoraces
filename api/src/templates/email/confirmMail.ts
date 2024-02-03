import { style } from '../style';
import { html } from '../utils';

const subject = 'Bienvenue sur Cinévoraces !';

const content = html`
    <html>
        ${style}
        <body>
            <main>
                <div class="container">
                    <h1>Bienvenue sur Cinévoraces.fr, votre <span class="emphasis">ciné-club</span> virtuel !</h1>
                    <p>
                        Vous avez bien reçu cet email, ce qui signifie que votre inscription est presque terminée.
                        Cliquez sur le lien ci-dessous pour confirmer votre inscription.
                    </p>
                    <a href="{{url}}">Confirmer mon inscription</a>
                </div>
            </main>
        </body>
    </html>
`;

export default { subject, content };
