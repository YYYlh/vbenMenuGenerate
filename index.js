#!/usr/bin/env node
const program = require('commander')
const process = require('process')
const fs = require('fs')
const path = require('path')
const { 
    getConfigDataTemplate,
    getTableTemplate,
    getApiTemplate,
    getModelTemplate,
    getTableModalTemplate,
    getModalTemplate,
    getTableDrawerTemplate,
    getDrawerTemplate
} = require('./template/index')

const cwd = process.cwd()

program
       .command('g <name>')
       .description('生成普通的表格页面')
       .option('-p --path [path]', '生成路径，views目录下', '')
       .option('-m --modal [modal]', '生成带弹框的表格')
       .option('-d --drawer [drawer]', '生成带抽屉的表格')
       .action((name, args) => {
            if (!args.path) {
                console.error('生成路径不能为空')
                process.exit(1)
            }
            const pagePath = path.join(cwd, 'src/views/' + args.path, name)
            if (fs.existsSync(pagePath)) {
                console.error('改目录已经存在')
                process.exit(1)
            }
            const upperCaseName = name.replace(name[0], name[0].toUpperCase());
            let getTablePage = getTableTemplate.bind(null, name, upperCaseName, args.path)

            fs.mkdirSync(pagePath, { recursive: true })
            if (args.modal) {
                fs.writeFileSync(pagePath + '/modal.vue', getModalTemplate(name, upperCaseName, args.path))
                getTablePage = getTableModalTemplate.bind(null, name, upperCaseName, args.path)
            } else if (args.drawer) {
                fs.writeFileSync(pagePath + '/drawer.vue', getDrawerTemplate(name, upperCaseName, args.path))
                getTablePage = getTableDrawerTemplate.bind(null, name, upperCaseName, args.path)
            }
            fs.writeFileSync(pagePath + '/index.vue', getTablePage())
            fs.writeFileSync(pagePath + `/${name}.data.ts`, getConfigDataTemplate())

            // 生成api
            const apiPath = path.join(cwd, 'src/api/' + args.path)
            fs.mkdir(apiPath, { recursive: true }, () => {
                fs.writeFileSync(apiPath + `/${name}.ts`, getApiTemplate(name, upperCaseName))
                fs.mkdir(apiPath + '/model', { recursive: true }, () => {
                    fs.writeFileSync(apiPath + '/model' + `/${name}Model.ts`, getModelTemplate(name))
                })
            })
       });
program.parse(process.argv);

let ABW096 = 'magnet:?xt=urn:btih:74B8700883584EFC92C79090CB31E00ED2887250'
