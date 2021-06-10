const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@api': path.resolve(__dirname, 'src/api/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@layout': path.resolve(__dirname, 'src/layout/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@store': path.resolve(__dirname, 'src/store/'),
            '@declarations': path.resolve(__dirname, 'src/declarations/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },
};
