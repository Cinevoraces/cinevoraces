const registerStringPrototypes = () => {
    Object.assign(String.prototype, {
        /**
         * Check if string is a valid entity.
         */
        is(type: 'valid-password' | 'valid-mail' | 'valid-pseudo'): boolean {
            if (type === 'valid-password') {
                return this.match(/^(?=.*[A-Z])(?=.*[!#$%*+=?|-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$/) ? true : false;
            } else if (type === 'valid-mail') {
                return this.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) ? true : false;
            } else if (type === 'valid-pseudo') {
                const forbidden = ['moi'];
                return !forbidden.includes(this);
            } else {
                return false;
            }
        },
    });
};

declare global {
    interface String {
        is(type: 'valid-password' | 'valid-mail' | 'valid-pseudo'): boolean;
    }
}

export default registerStringPrototypes;
