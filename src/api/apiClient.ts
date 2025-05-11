
/**
 * API клиент для работы с бэкендом
 * В будущем здесь может быть настроен axios или другой HTTP клиент
 */
import { Signal, KOL } from "@/data/mockData";

// Базовый URL API (заменить на реальный при наличии бэкенда)
export const API_BASE_URL = "https://api.kolleaderboard.com";

// Функция для имитации задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для имитации API запросов с возможными ошибками
export async function fetchWithDelay<T>(data: T, errorRate: number = 0.1): Promise<T> {
  // Имитация задержки сети от 300 до 800 мс
  await delay(300 + Math.random() * 500);
  
  // Имитация случайной ошибки с заданной вероятностью
  if (Math.random() < errorRate) {
    throw new Error("API request failed");
  }
  
  return data;
}

// Интерфейс для параметров запросов
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SignalFilterParams {
  asset?: string;
  type?: string;
  kolId?: number;
}

export interface KOLFilterParams {
  platform?: string;
  language?: string;
  minFollowers?: number;
  minAccuracy?: number;
  isPremium?: boolean;
}
