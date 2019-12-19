module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order'],
    rules: {
        indentation: 4, //4空格
        // at-rule-no-unknown: 屏蔽一些scss等语法检查
        'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }],
        // css-next :global
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
        'order/order': ['custom-properties', 'declarations'],
        'order/properties-alphabetical-order': true,
    },
}
