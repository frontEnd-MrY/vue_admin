module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", '@vue/standard'],
    rules: {
    // 禁止使用console
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 禁止使用debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 代码缩进
        indent: ['error', 4],
        // 语句强制分号结尾
        semi: ['error', 'always'],
        // 引号类型 ""
        quotes: [
            'error',
            'single',
            { allowTemplateLiterals: true, avoidEscape: true }
        ],
        // 禁用var，用let和const代替
        'no-var': 'error',
        // 函数名括号前不需要有空格
        'space-before-function-paren': [0, 'always'],
        // 块语句内行首行尾是否要空行
        'padded-blocks': 'off',
        // 最多出现3个连续空行
        'no-multiple-empty-lines': [
            'error',
            {
                max: 3,
                maxBOF: 1
            }
        ],
        // 自定义规则
        'no-eval': 0,
        // 全等规则
        eqeqeq: 0,
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: 'commit'
            }
        ],
        // html属性必须换行
        'vue/max-attributes-per-line': 'off',
        // 没有内容的元素需要使用闭合标签
        'vue/html-self-closing': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
