@echo off
title MyKit.tools - Git Push

:: Change to the directory where this bat file lives
cd /d "%~dp0"

color 1F
echo.
echo  ==========================================
echo   MyKit.tools - Stage, Commit ^& Push
echo  ==========================================
echo.
echo  Working in: %cd%
echo.

:: Show what's changed
echo  Checking for changes...
git status --short
echo.

set /p MSG="  Commit message (or press Enter for default): "
if "%MSG%"=="" set MSG=Update tools and fixes

echo.
echo  [1/3] Staging all changes...
git add -A
if errorlevel 1 (
    echo  ERROR: git add failed
    pause
    exit /b 1
)
echo        Done.

echo.
echo  [2/3] Committing: "%MSG%"
git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo  NOTE: Nothing new to commit, pushing anyway...
)

echo.
echo  [3/3] Pushing to origin...
git push
if errorlevel 1 (
    echo.
    echo  ERROR: Push failed. Check your connection or credentials.
    pause
    exit /b 1
)

echo.
echo  ==========================================
echo   Pushed successfully!
echo  ==========================================
echo.
pause
