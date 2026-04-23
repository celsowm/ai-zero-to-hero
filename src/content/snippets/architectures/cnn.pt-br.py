# @region e2e
# 1. ENTRADA (Grade de Pixels 5x5)
imagem = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
]

# 2. FILTRO/KERNEL (Detector de Bordas 3x3)
kernel = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
]

# 3. LÓGICA DE CONVOLUÇÃO
def convolution2d(img, ker):
    h, w = len(img), len(img[0])
    kh, kw = len(ker), len(ker[0])
    res = []
    
    for y in range(h - kh + 1):
        row = []
        for x in range(w - kw + 1):
            # Recorte local multiplicado pelo kernel
            soma = 0
            for i in range(kh):
                for j in range(kw):
                    soma += img[y+i][x+j] * ker[i][j]
            row.append(soma)
        res.append(row)
    return res

# 4. EXECUÇÃO
mapa_caracteristicas = convolution2d(imagem, kernel)
print(f"Mapa de Saída: {mapa_caracteristicas}")
# @end
