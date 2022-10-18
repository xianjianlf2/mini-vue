module.exports = {
  remoteUrl: 'https://github.com/xianjianlf2/mini-vue', // repo address
  mainBranch: 'main', // your default branch. default 'main'
  dirPath: '.', //  the dir where you want to gengerate the toc. default '.'
  mdPath: ['./README.md'], // the markdown files path, when there is only one path, it also can be a string.  default ['README.md']
  excludes: ['.git', 'node_modules', '_', '__tests__', '*.js', '*.ts'] // the excludes file name or dir name
}
