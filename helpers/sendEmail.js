import nodemailer from 'nodemailer';

const { BASE_URL, UKR_NET_HOST, UKR_NET_USER, UKR_NET_PASSWORD } = process.env;

const config = {
    host: UKR_NET_HOST,
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_USER,
        pass: UKR_NET_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

export const sendVereficationEmail = ({ to, verificationToken }) => {
    const verificationEmail = {
        from: UKR_NET_USER,
        subject: 'Verify email',
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
        to,
    };

    return transporter.sendMail(verificationEmail);
};
