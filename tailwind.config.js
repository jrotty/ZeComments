/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: {
    files: ["./comments.php"],
    transform: (content) => {
      // 移除非类名的"hidden"（示例：假设类名是class="hidden"，其他场景的hidden替换为空）
      return content.replace(/hidden(?!=["'])/g, "");
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'page-navigator', // 保持 page-navigator 类名不被移除
  ],
  corePlugins: {
    preflight: false, // 保持禁用全局基础样式
  },
  // 关键：显式扩展 transform 和 rotate 的 hover 变体
  variants: {
    extend: {
      transform: ['hover'], // 启用 transform 的 hover 变体
      rotate: ['hover'],    // 启用 rotate 的 hover 变体
      // 如需使用其他状态（如 focus、active），可一并添加
      // transform: ['hover', 'focus'],
      // rotate: ['hover', 'focus'],
    },
  },
}

