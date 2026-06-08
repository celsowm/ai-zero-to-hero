winget install Git.Git Kitware.CMake Microsoft.VisualStudio.2022.BuildTools --source winget
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build
cmake --build build --config Release
.\build\bin\Release\llama-cli.exe -hf ggml-org/gemma-3-1b-it-GGUF -p "Hello, world!"
