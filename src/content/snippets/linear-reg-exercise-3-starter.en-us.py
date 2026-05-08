# Training data: (area_m2, distance_km, price_k)
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
    """Mean Squared Error — same as exercise #1"""
    total = 0
    for i in range(len(y_true)):
        total += (y_true[i] - y_pred[i]) ** 2
    return total / len(y_true)

def train(dataset, epochs=100, lr=0.0001):
    beta0, beta1, beta2 = 0.0, 0.0, 0.0
    n = len(dataset)
    
    for epoch in range(epochs):
        # calculate gradients (sum of errors * derivative)
        grad0 = 0.0
        grad1 = 0.0
        grad2 = 0.0
        for area, distance, price in dataset:
            y_hat = predict(area, distance, beta0, beta1, beta2)
            error = y_hat - price
            grad0 += error          # dMSE/dbeta0
            grad1 += error * area    # dMSE/dbeta1
            grad2 += error * distance # dMSE/dbeta2
        
        # complete: update betas with Gradient Descent
        beta0 = 
        beta1 = 
        beta2 = 
        
        # show MSE every 20 epochs to track convergence
        if (epoch + 1) % 20 == 0:
            y_trues = [p for _, _, p in dataset]
            y_preds = [predict(a, d, beta0, beta1, beta2) for a, d, _ in dataset]
            print(f"  Epoch {epoch+1}: MSE = {mse(y_trues, y_preds):.2f}")
    
    return beta0, beta1, beta2

# Step 1: train the model
print("Training...")
b0, b1, b2 = train(dataset)
print(f"\nLearned coefficients: beta0={b0:.2f}, beta1={b1:.4f}, beta2={b2:.4f}")

# Step 2: predict price for a new apartment
area_new, dist_new = 60, 5
price_estimate = predict(area_new, dist_new, b0, b1, b2)
print(f"\nPrediction for {area_new}m² at {dist_new}km: BRL {price_estimate:.1f}k")

# Step 3: error analysis with final MSE
print(f"\nTraining error analysis:")
y_trues = [p for _, _, p in dataset]
y_preds = [predict(a, d, b0, b1, b2) for a, d, _ in dataset]
print(f"  Final MSE: {mse(y_trues, y_preds):.2f}")
for area, distance, price in dataset:
    pred = predict(area, distance, b0, b1, b2)
    err = abs(price - pred)
    print(f"  {area}m²/{distance}km: real=BRL{price}k, predicted=BRL{pred:.1f}k, err=BRL{err:.1f}k")
