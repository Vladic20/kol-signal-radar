
import { Signal, signals as mockSignals } from "@/data/mockData";
import { fetchWithDelay, SignalFilterParams, PaginationParams } from "./apiClient";

// Получение списка сигналов с фильтрами
export async function getSignals(filters?: SignalFilterParams, pagination?: PaginationParams): Promise<Signal[]> {
  let filtered = [...mockSignals];

  if (filters) {
    if (filters.asset) {
      filtered = filtered.filter(signal => signal.asset === filters.asset);
    }
    
    if (filters.type) {
      filtered = filtered.filter(signal => signal.type === filters.type);
    }
    
    if (filters.kolId) {
      filtered = filtered.filter(signal => signal.kolId === filters.kolId);
    }
  }

  // Применяем пагинацию если она указана
  if (pagination) {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    filtered = filtered.slice(start, end);
  }

  try {
    return await fetchWithDelay(filtered);
  } catch (error) {
    console.error("Error fetching signals:", error);
    throw error;
  }
}

// Получение сигнала по ID
export async function getSignalById(id: number): Promise<Signal | null> {
  try {
    const signal = mockSignals.find(s => s.id === id) || null;
    return await fetchWithDelay(signal);
  } catch (error) {
    console.error(`Error fetching signal with id ${id}:`, error);
    throw error;
  }
}

// Получение сигналов KOL
export async function getKolSignals(kolId: number): Promise<Signal[]> {
  try {
    const signals = mockSignals.filter(signal => signal.kolId === kolId);
    return await fetchWithDelay(signals);
  } catch (error) {
    console.error(`Error fetching signals for KOL with id ${kolId}:`, error);
    throw error;
  }
}

// Получение истории просмотров сигналов для пользователя
export async function getUserViewedSignals(userId: string): Promise<number[]> {
  try {
    // Имитация ответа API с ID просмотренных сигналов
    return await fetchWithDelay([1, 2, 4]); // Пример: сигналы с ID 1, 2 и 4
  } catch (error) {
    console.error(`Error fetching viewed signals for user ${userId}:`, error);
    throw error;
  }
}

// Добавление сигнала в историю просмотров
export async function addSignalToViewHistory(signalId: number, userId: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы POST запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error adding signal ${signalId} to view history for user ${userId}:`, error);
    throw error;
  }
}

// Очистка истории просмотров
export async function clearViewHistory(userId: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы DELETE запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error clearing view history for user ${userId}:`, error);
    throw error;
  }
}
