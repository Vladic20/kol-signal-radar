
// Mock price history data for signals
export type PricePoint = {
  date: string;
  price: number;
}

// Get price history for a specific signal
export function getSignalPriceHistory(signalId: number): PricePoint[] {
  // In a real app, this would fetch from an API
  // Here we're generating mock data based on the signal ID
  const seed = signalId * 10;
  const now = new Date();
  const history: PricePoint[] = [];
  
  // Generate price points for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Generate somewhat random but consistent price movements
    const volatility = (Math.sin(seed + i * 0.5) * 0.1) + 0.05;
    const trend = Math.sin(seed * 0.1 + i * 0.1) * 0.2;
    const randomFactor = Math.cos(seed * 0.3 + i * 0.7) * volatility;
    
    // Base price is 100 + seed % 400 to get different price ranges for different assets
    const basePrice = 100 + (seed % 400);
    const price = basePrice + (basePrice * (trend + randomFactor));
    
    history.push({
      date: date.toISOString(),
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return history;
}

// Initialize mock price histories
export const priceHistories: Record<number, PricePoint[]> = {};

// Pre-populate the price histories for quick access
for (let i = 1; i <= 20; i++) {
  priceHistories[i] = getSignalPriceHistory(i);
}
