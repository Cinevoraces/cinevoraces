import { EmailTemplate } from '../../src/classes';

describe('classes.EmailTemplate.ts', () => {
    const to = { mail: 'gregory.michalak.192@gmail.com', pseudo: 'Test' };
    const params = { url: 'www.cinevoraces.fr' };

    let template: InstanceType<typeof EmailTemplate>;

    it('contructor()', () => {
        template = new EmailTemplate({
            subject: 'Cinevotest',
            content: '<div><a href="{{ url }}">See my website please lol</a></div>',
            styles: ['<style>div { background-color: green; }</style>'],
        });
        expect(template).toBeInstanceOf(EmailTemplate);
        expect(template.getEmail().htmlContent).toBe(
            '<html><head><style>div { background-color: green; }</style></head><body><div><a href="{{ url }}">See my website please lol</a></div></body></html>',
        );
    });

    it('getEmail()', () => {
        const email = template.getEmail();
        expect(email).toHaveProperty('subject');
        expect(email).toHaveProperty('htmlContent');
        expect(email).toHaveProperty('to');
        expect(email).toHaveProperty('sender');
    });

    it('setHeaders()', () => {
        template.setHeaders({ 'X-Mailer': 'Cinevoraces' });
        expect(template.getEmail().headers).toEqual({ 'X-Mailer': 'Cinevoraces' });
    });

    it('addDestinator()', () => {
        template.addDestinator(to);
        expect(template.getEmail().to).toEqual([{ email: to.mail, name: to.pseudo }]);
    });

    it('insertParams()', () => {
        template.insertParams(params);
        expect(template.getEmail().htmlContent).toBe(
            '<html><head><style>div { background-color: green; }</style></head><body><div><a href="www.cinevoraces.fr">See my website please lol</a></div></body></html>',
        );
    });
});
