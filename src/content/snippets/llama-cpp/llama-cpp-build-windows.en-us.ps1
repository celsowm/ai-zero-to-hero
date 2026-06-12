$hasVSCode = if (Get-Command code -ErrorAction SilentlyContinue) { "Installed" } else { "Not Found" }; $hasCpp = if (& "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.VisualStudio.Workload.NativeDesktop) { "Installed" } else { "Not Found" }; Write-Host "VS Code: $hasVSCode`nVisual Studio C++: $hasCpp"
winget install Git.Git Kitware.CMake Microsoft.VisualStudio.2022.BuildTools --source winget
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build `
  -G "Visual Studio 17 2022" `
  -A x64 `
  -DGGML_CUDA=ON `
  -DBUILD_SHARED_LIBS=OFF `
  -DLLAMA_BUILD_BORINGSSL=ON
cmake --build build --config Release
.\build\bin\Release\llama-cli.exe -hf ggml-org/gemma-3-1b-it-GGUF -p "Hello, world!"
