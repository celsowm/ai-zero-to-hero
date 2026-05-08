# Dados de treino: (area_m2, distancia_km, preco_mil)
dataset = [
    (45, 8, 62),
    (70, 3, 105),
    (55, 6, 78),
    (90, 2, 130),
    (40, 10, 50),
]

def predict(area, distance, beta0, beta1, beta2):
    return beta0 + beta1 * area + beta2 * distance

def mse(y_true, y_pred):
    """Mean Squared Error — o mesmo do exercício #1"""
    total = 0
    for i in range(len(y_true)):
        total += (y_true[i] - y_pred[i]) ** 2
    return total / len(y_true)

def train(dataset, epochs=100, lr=0.0001):
    beta0, beta1, beta2 = 0.0, 0.0, 0.0
    n = len(dataset)
    
    for epoch in range(epochs):
        # calcule os gradientes (soma dos erros * derivada)
        grad0 = 0.0
        grad1 = 0.0
        grad2 = 0.0
        for area, distance, price in dataset:
            y_hat = predict(area, distance, beta0, beta1, beta2)
            error = y_hat - price
            grad0 += error          # dMSE/dbeta0
            grad1 += error * area    # dMSE/dbeta1
            grad2 += error * distance # dMSE/dbeta2
        
        # complete: atualize os betas com Gradient Descent
        beta0 = 
        beta1 = 
        beta2 = 
        
        # mostre o MSE a cada 20 epochs para ver a convergência
        if (epoch + 1) % 20 == 0:
            y_trues = [p for _, _, p in dataset]
            y_preds = [predict(a, d, beta0, beta1, beta2) for a, d, _ in dataset]
            print(f"  Epoch {epoch+1}: MSE = {mse(y_trues, y_preds):.2f}")
    
    return beta0, beta1, beta2

# Etapa 1: treinar o modelo
print("Treinando...")
b0, b1, b2 = train(dataset)
print(f"\nCoeficientes aprendidos: beta0={b0:.2f}, beta1={b1:.4f}, beta2={b2:.4f}")

# Etapa 2: prever preço de um apartamento novo
area_nova, dist_nova = 60, 5
preco_estimado = predict(area_nova, dist_nova, b0, b1, b2)
print(f"\nPrevisão para {area_nova}m² a {dist_nova}km: R$ {preco_estimado:.1f} mil")

# Etapa 3: análise de erro com MSE final
print(f"\nAnálise de erro nos dados de treino:")
y_trues = [p for _, _, p in dataset]
y_preds = [predict(a, d, b0, b1, b2) for a, d, _ in dataset]
print(f"  MSE final: {mse(y_trues, y_preds):.2f}")
for area, distance, price in dataset:
    pred = predict(area, distance, b0, b1, b2)
    err = abs(price - pred)
    print(f"  {area}m²/{distance}km: real=R${price}k, predito=R${pred:.1f}k, erro=R${err:.1f}k")
