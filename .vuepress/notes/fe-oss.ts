import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: '开源库指南',
  link: '/fe-oss/',
  sidebar: [
    'intro',
    {
      prefix: '日志输出',
      text: '日志输出',
      collapsed: true,
      items: ['ansis', 'chalk', 'picocolors', 'ora', 'pino', 'consola', 'vconsole', 'eruda'],
    },
    {
      prefix: '路径处理',
      text: '路径处理',
      collapsed: true,
      items: ['pathe', 'upath', 'path-to-regexp'],
    },
    {
      prefix: '文件系统',
      text: '文件系统',
      collapsed: true,
      items: [
        {
          text: '文件查找',
          items: [
            'minimatch',
            'micromatch',
            'picomatch',
            'fs.glob',
            'glob',
            'tiny-glob',
            'fast-glob',
            'globby',
            'tinyglobby',
          ],
        },
        {
          text: '文件监听',
          items: ['chokidar'],
        },
        {
          text: '文件操作',
          items: ['node-fs', 'fdir'],
        },
        {
          text: '虚拟文件系统',
          items: ['memfs'],
        },
      ],
    },
    {
      prefix: '数据校验',
      text: '数据校验',
      collapsed: true,
      items: ['validator', 'zod', 'ajv', 'joi'],
    },
    {
      prefix: '数据存储',
      text: '数据存储',
      collapsed: true,
      items: [
        {
          text: '缓存',
          items: ['lru-cache', 'quick-lru', 'keyv'],
        },
        {
          text: '数据库',
          items: ['lowdb', 'leveldb', 'better-sqlite3'],
        },
      ],
    },
    {
      prefix: '配置管理',
      text: '配置管理',
      collapsed: true,
      items: ['dotenv', 'cosmiconfig', 'unconfig'],
    },
    {
      prefix: '命令行解析',
      text: '命令行解析',
      collapsed: true,
      items: [
        { text: '参数解析', items: ['yargs-parser', 'minimist'] },
        { text: '命令解析', items: ['yargs', 'commander', 'cac'] },
        { text: '交互式解析', items: ['inquirer', 'clack-prompts'] },
      ],
    },
  ],
})
