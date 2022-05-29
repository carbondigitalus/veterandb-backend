// NPM Modules
import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';

// usage example
// new Email(user, url).sendWelcome();
export class Email {
    to: string;
    firstName: string;
    url: string;
    from: string;

    constructor(user: any, url: any) {
        this.to = `${user.firstName} ${user.lastName}<${user.email}>`;
        this.firstName = user.firstName;
        this.url = url;
        this.from = `Ledbetter CEO Jared M<${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Send Grid Transporter
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }
        // Mail Trap Transporter
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // return nodemailer.createTransport({
        //     host: 'smtp.mailtrap.io',
        //     port: 2525,
        //     auth: {
        //         user: '5d9266c2853eb3',
        //         pass: '8d8f81df86f16b'
        //     }
        // });
    }

    // Send the actual email
    async send(template: any, subject: string) {
        // 1. Render the HTML from .pug file
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject
            }
        );

        // 2. Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
            // html:
        };
        // 3. Create a transport & send email
        await this.newTransport().sendMail(mailOptions);
    }

    // used on initial registration
    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Carbon Builder Family!');
    }

    // used for password reset
    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes).'
        );
    }

    // used to notify user that account was successfully deactivated
    async sendUserDeactivationNotice() {
        await this.send(
            'deactivateUser',
            'Your account was successfully deactivated.'
        );
    }
}
