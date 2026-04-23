# @region e2e
# 1. INPUT (5x5 Pixel Grid)
image = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
]

# 2. FILTER/KERNEL (3x3 Edge Detector)
kernel = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
]

# 3. CONVOLUTION LOGIC
def convolution2d(img, ker):
    h, w = len(img), len(img[0])
    kh, kw = len(ker), len(ker[0])
    res = []
    
    for y in range(h - kh + 1):
        row = []
        for x in range(w - kw + 1):
            # Local patch multiplied by the kernel
            patch_sum = 0
            for i in range(kh):
                for j in range(kw):
                    patch_sum += img[y+i][x+j] * ker[i][j]
            row.append(patch_sum)
        res.append(row)
    return res

# 4. EXECUTION
feature_map = convolution2d(image, kernel)
print(f"Output Map: {feature_map}")
# @end
