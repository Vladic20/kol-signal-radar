
import { KOL, kols as mockKols } from "@/data/mockData";
import { fetchWithDelay, KOLFilterParams, PaginationParams } from "./apiClient";

// Получение всех KOL с применением фильтров и пагинации
export async function getKols(filters?: KOLFilterParams, pagination?: PaginationParams): Promise<KOL[]> {
  let filtered = [...mockKols];

  if (filters) {
    if (filters.platform) {
      filtered = filtered.filter(kol => 
        kol.platforms.some(p => p.name === filters.platform)
      );
    }

    if (filters.language) {
      filtered = filtered.filter(kol => 
        kol.language === filters.language || kol.language === 'Both'
      );
    }

    if (filters.minFollowers) {
      filtered = filtered.filter(kol => {
        const totalFollowers = kol.platforms.reduce((sum, p) => sum + p.followers, 0);
        return totalFollowers >= filters.minFollowers! * 1000;
      });
    }

    if (filters.minAccuracy) {
      filtered = filtered.filter(kol => kol.accuracy >= filters.minAccuracy!);
    }

    // Фильтр для премиум-пользователей (для реализации ограничений)
    if (filters.isPremium === false) {
      filtered = filtered.filter(kol => !kol.premium);
    }
  }

  // Сортировка по точности
  filtered = filtered.sort((a, b) => b.accuracy - a.accuracy);

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
    console.error("Error fetching KOLs:", error);
    throw error;
  }
}

// Получение KOL по ID
export async function getKolById(id: number): Promise<KOL | null> {
  try {
    const kol = mockKols.find(k => k.id === id) || null;
    return await fetchWithDelay(kol);
  } catch (error) {
    console.error(`Error fetching KOL with id ${id}:`, error);
    throw error;
  }
}

// Добавление KOL в избранное пользователя
export async function addKolToFavorites(kolId: number, userId: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы POST запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error adding KOL ${kolId} to favorites for user ${userId}:`, error);
    throw error;
  }
}

// Удаление KOL из избранного
export async function removeKolFromFavorites(kolId: number, userId: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы DELETE запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error removing KOL ${kolId} from favorites for user ${userId}:`, error);
    throw error;
  }
}

// Получение списка избранных KOL для пользователя
export async function getUserFavoriteKols(userId: string): Promise<number[]> {
  try {
    // Имитация ответа API с ID избранных KOL
    return await fetchWithDelay([1, 3]); // Пример: KOL с ID 1 и 3
  } catch (error) {
    console.error(`Error fetching favorite KOLs for user ${userId}:`, error);
    throw error;
  }
}
