module.exports = {
    mode: 'production',
    entry: './src/app.tsx', // 追加
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(gif|png|jpe?g|)$/, use: 'file-loader?name=assets/[name]-[hash].[ext]' },
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.(gif|png|jpe?g|)$/, use: 'url-loader' }, // 追加
        ],
    },
};