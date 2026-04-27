@echo off
chcp 65001 >nul
echo ========================================
echo   fzx-daihuo-prompt-skill Push Script
echo ========================================
echo.

REM 设置代理（如果有）
set HTTPS_PROXY=http://127.0.0.1:63256
set HTTP_PROXY=http://127.0.0.1:63256

REM 关闭 SSL 验证（配合代理使用）
set GIT_SSL_NO_VERIFY=1

cd /d "%~dp0"

echo [1/3] 检查远程仓库...
git remote -v
echo.

echo [2/3] 设置远程仓库（HTTPS 方式）...
git remote set-url origin https://github.com/ai-fzx/fzx_daihuo_prompt_skill.git

echo.
echo [3/3] 推送到 GitHub...
git -c http.sslVerify=false push

echo.
echo ========================================
echo   Done!
echo ========================================
pause
