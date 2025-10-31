#!/usr/bin/env node

/**
 * SEO 检查脚本
 * 运行: node scripts/seo-check.js
 */

const fs = require('fs');
const path = require('path');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    checks.passed.push(`✅ ${description}`);
    return true;
  } else {
    checks.failed.push(`❌ ${description} - 文件不存在: ${filePath}`);
    return false;
  }
}

function checkEnvVariable(varName, description) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    if (content.includes(varName)) {
      checks.passed.push(`✅ ${description}`);
      return true;
    }
  }
  checks.warnings.push(`⚠️  ${description} - 未在 .env.local 中找到 ${varName}`);
  return false;
}

console.log('\n🔍 开始 SEO 检查...\n');

// 检查必需文件
console.log('📁 检查必需文件:');
checkFile('next-sitemap.config.js', 'next-sitemap 配置文件');
checkFile('app/manifest.ts', 'manifest.ts 文件');
checkFile('app/icon.svg', 'icon.svg 文件');

// 检查国际化文件
console.log('\n🌍 检查国际化文件:');
checkFile('messages/en.json', '英文翻译文件');
checkFile('messages/zh.json', '中文翻译文件');
checkFile('i18n/routing.ts', 'i18n 路由配置');
checkFile('proxy.ts', 'proxy 文件 (Next.js 16)');

// 检查环境变量
console.log('\n⚙️  检查环境变量:');
checkEnvVariable('NEXT_PUBLIC_BASE_URL', '基础 URL 配置');

// 检查 next-sitemap 配置
console.log('\n🤖 检查 next-sitemap 配置:');
const sitemapConfigPath = path.join(process.cwd(), 'next-sitemap.config.js');
if (fs.existsSync(sitemapConfigPath)) {
  const configContent = fs.readFileSync(sitemapConfigPath, 'utf-8');
  if (configContent.includes('random-picker-tau.vercel.app')) {
    checks.passed.push('✅ next-sitemap 配置正确');
  } else {
    checks.warnings.push('⚠️  next-sitemap 配置可能需要更新域名');
  }
}

// 输出结果
console.log('\n' + '='.repeat(50));
console.log('📊 检查结果汇总:\n');

if (checks.passed.length > 0) {
  console.log('通过的检查:');
  checks.passed.forEach(item => console.log(item));
}

if (checks.warnings.length > 0) {
  console.log('\n警告:');
  checks.warnings.forEach(item => console.log(item));
}

if (checks.failed.length > 0) {
  console.log('\n失败的检查:');
  checks.failed.forEach(item => console.log(item));
}

console.log('\n' + '='.repeat(50));
console.log(`\n总计: ${checks.passed.length} 通过, ${checks.warnings.length} 警告, ${checks.failed.length} 失败\n`);

if (checks.failed.length > 0) {
  console.log('❌ SEO 检查未通过，请修复上述问题。\n');
  process.exit(1);
} else if (checks.warnings.length > 0) {
  console.log('⚠️  SEO 检查通过，但有警告需要注意。\n');
  process.exit(0);
} else {
  console.log('✅ 所有 SEO 检查通过！\n');
  process.exit(0);
}
