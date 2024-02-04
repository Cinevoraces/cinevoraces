import { html } from '../utils/templateStrings';

export const style = html`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

        h1 {
            font-size: 1.3em;
            margin-top: 0;
        }

        a.link,
        a.link:hover,
        a.link:active,
        a.link:visited,
        a.link:focus {
            color: #fc9a3f;
            text-decoration: none;
        }

        .main {
            font-family: 'Montserrat', Arial, sans-serif;
            color: #f2f2f3;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            background-color: #202029;
            border-radius: 0.75rem;
            padding: 2rem;
            margin: 2rem;
            max-width: 600px;
        }

        .emphasis {
            color: #fc9a3f;
        }
    </style>
`;
