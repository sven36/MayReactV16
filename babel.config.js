module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                },
                // useBuiltIns: "false",//是否开启自动支持 polyfill
            },
        ],
        [
            "@babel/preset-react",
            // {
            //     "pragma": "dom", // default pragma is React.createElement
            //     "pragmaFrag": "DomFrag", // default is React.Fragment
            //     "throwIfNamespace": false // defaults to true
            // }
        ]
    ];
    const plugins = [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                // "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ];

    return {
        presets,
        plugins
    };
}