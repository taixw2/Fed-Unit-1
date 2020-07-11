## 简答题

### 1. 谈谈你对工程化的初步认识,结合之前遇到的问题说出三个工程化能够解决的问题或带来的价值

答: 工程化的出现能够解决前端重复而繁杂的工作, 以及替代由人所带来的一些不确定因素, 比如:

**创建阶段**

当项目多时, 不统一的项目结构会增加不少的学习成本, 以及一定程度上会混乱开发者的思维。 通过脚手架, 能够在创建阶段统一代码风格, 甚至提示出不合规范的地方以及提出改进意见, 以及能够提供子命令用于创建统一的对象创建

在创建阶段工程化所体现的价值是提供统一的范式

**编码阶段**

在编程的过程中, 往往需要统一的代码风格, 否则会让 git diff 失去作用, 从而无法做到 code review, 难以在上线前检测出可能存在的问题, 所以通常配置相同的 IDE 规则, 通过自动检测错误以及统一的自动格式化代码, 减少可能出现的风险

在编码阶段工程化能够提供智能的提示, 以及统一的格式, 热更新等等

> 统一的 IDE 配置,我认为也可以作为工程化的一部分

**测试阶段**

前端往往变化多样, 以及面向用户的很多不确定性, 使得测试难以流行, 但是依然有 jest 等测试工具提供必要的功能

测试阶段在工程化上提供了可靠的, 满足需求的测试工具

**提交阶段**

当每个人一种代码风格, 对 git diff 是毁灭性的, 这时候就可以通过 git hooks 来对代码做最后一次的检测, 以及提交后自动通知相应的人员进行操作

在提交阶段作为对代码质量的最后一道关, 以及能够自动发出相应的通知

**部署阶段**

在没有 CI/CD 工具以前, 提交到服务器通常是后端的事, 或者难免的手动拖动代码到服务器, 现在可以利用 jenkins 以及 github action 等等 CI/CD 工具, 配合 git hooks 做到自动化部署, 减少人为所带来的风险

在部署阶段所带来的是自动化代替手动, 自动检测代替肉眼检测

### 2. 你认为脚手架除了创建目录结构,还有什么更深层次的意义?

统一项目目录结构、基本编程范式，增加开发效率，以及减少人为因素所带来的错误

## 编程题

### 1. 概述脚手架实现过程. 并使用 Nodejs 实现一个自定义的小型脚手架工具

通过读取用户的输入配置(配置文件或者命令行配置), 搭配相应的模板文件, 最后输出相应的目录结构

[sample-scaffold](./codes/sample-scaffold)

### 2. 使用 Gulp 完成项目的自动化构建

[pages-boilerplate-gulp](https://github.com/taixw2/fed-e-code/tree/98fe636c1a65d381eab0b684743a238704f458d0/part-02/module-02/pages-boilerplate-gulp)

### 3. 使用 Grunt 完成项目的自动化构建

[pages-boilerplate-grunt](https://github.com/taixw2/fed-e-code/tree/98fe636c1a65d381eab0b684743a238704f458d0/part-02/module-02/pages-boilerplate-grunt)

### 4. 视频地址

1. [gulp](https://dx-docs.oss-cn-shenzhen.aliyuncs.com/gulp-720p.mp4)
2. [grunt](https://dx-docs.oss-cn-shenzhen.aliyuncs.com/grunt-720p.mp4)

<video src="https://dx-docs.oss-cn-shenzhen.aliyuncs.com/gulp-720p.mp4" width="571" controls="controls" />

<video src="https://dx-docs.oss-cn-shenzhen.aliyuncs.com/grunt-720p.mp4" width="571" controls="controls" />
