---
pageLayout: home
title: 备忘录
icon: /images/memorandum.svg
pageClass: page-memorandum
config:
  -
    type: doc-hero
    hero:
      name: 备忘录
      tagline: 日常开发中，所使用的各类技术 和 工具 备忘录。
      image: /images/memorandum.svg

  -
    type: features
    features:
      -
        title: SSH
        icon: mdi:ssh
        details: SSH 命令行、SCP、keygen 生成
        link: ./ssh.md
      -
        title: Grep
        icon: cil:find-in-page
        details: Grep 命令行、参数、正则表达式
        link: ./grep.md
      -
        title: Git
        icon: logos:git-icon
        details: Git 命令行、日志、统计、分支
        link: ./git.md
      -
        title: pm2
        icon: logos:pm2-icon
        details: pm2 进程管理、配置
        link: ./pm2.md
      -
        title: nginx
        icon: logos:nginx
        details: nginx 配置，常用功能示例
        link: ./nginx.md
      -
        title: cargo
        icon: logos:rust
        details: cargo 命令行、参数
        link: ./cargo.md
  -
    type: custom
permalink: /memorandum/
createTime: 2024/06/20 22:02:04
---

<style>
.page-memorandum {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #ff8736 30%, #ffdf85);
  --vp-home-hero-image-background-image: linear-gradient(
    45deg,
    rgb(255, 246, 215) 50%,
    rgb(239, 216, 177) 50%
  );
  --vp-home-hero-image-filter: blur(44px);
}

[data-theme="dark"] .page-memorandum {
  --vp-home-hero-image-background-image: linear-gradient(
    45deg,
    rgba(255, 246, 215, 0.07) 50%,
    rgba(239, 216, 177, 0.15) 50%
  );
}
</style>
