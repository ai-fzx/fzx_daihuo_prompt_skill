@echo off
REM ==========================================
REM fzx-daihuo-prompt-skill GitHub 推送脚本
REM 在能访问 GitHub 的环境下运行此脚本
REM ==========================================

cd /d "C:\Users\admin\.workbuddy\skills\fzx-daihuo-prompt-skill"

echo [1/3] 检查 Git 状态...
git status

echo.
echo [2/3] 设置远程仓库（HTTPS 方式）...
git remote set-url origin https://github.com/ai-fzx/fzx_daihuo_prompt_skill.git
git remote -v

echo.
echo [3/3] 推送到 GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ 推送完成！访问: https://github.com/ai-fzx/fzx_daihuo_prompt_skill
pause
