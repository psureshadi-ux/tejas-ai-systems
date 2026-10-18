@echo off
title Deploy Tejas AI Systems to Vercel
echo =================================================================
echo Deploying Tejas AI Systems Demos to Vercel (100%% Free, 24/7)
echo =================================================================
echo.
echo Packaging fresh prototypes...
cd /d "%~dp0"
py export_public_demos.py
echo.
echo Launching Vercel deployment...
cd public_demos
npx vercel
echo.
pause
