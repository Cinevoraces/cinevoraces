export const envCheck = () => {
    const missing = [
        'CLOUDINARY_URL',
        'PASS_REGEXP',
        'JWT_SECRET',
        'COOKIE_SECRET',
        'BREVO_API_KEY',
        'POSTGRES_USER',
        'POSTGRES_DB',
        'POSTGRES_PASSWORD',
        'POSTGRES_HOST',
        'POSTGRES_PORT',
    ].filter(env => !process.env[env]);

    if (!missing.length) return;

    console.log('Missing environment variables:');
    missing.forEach(env => console.log(`- ${env}`));
    console.log();
    throw new Error('You are missing one or more required environment variables.');
};
