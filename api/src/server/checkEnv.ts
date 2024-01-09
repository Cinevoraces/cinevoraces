/**
 * Checks if all required environment variables are set and throws an error if not.
 */
export const checkEnv = () => {
    const missing = [
        'CLOUDINARY_URL',
        'PASS_REGEXP',
        'JWT_SECRET',
        'COOKIE_SECRET',
        'POSTGRES_USER',
        'POSTGRES_DB',
        'POSTGRES_PASSWORD',
        'POSTGRES_HOST',
        'POSTGRES_PORT',
    ].filter(env => !process.env[env]);

    console.log('Missing environment variables:');
    missing.forEach(env => console.log(`- ${env}`));
    console.log();

    throw new Error('You are missing one or more required environment variables.');
};
